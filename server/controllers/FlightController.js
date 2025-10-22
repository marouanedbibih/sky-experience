import mongoose from 'mongoose';
import Flight from '../models/Flight.js'
import multer from 'multer'
import cloudinary from '../config/cloudinary.js'
import streamifier from 'streamifier'

// Multer setup for memory storage (handle multiple images)
const storage = multer.memoryStorage()
export const uploadFlightImages = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit per file
    files: 5 // 1 main + 4 additional
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'), false)
    }
  }
}).fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'images', maxCount: 4 }
])

// Upload buffer to Cloudinary, returns secure_url
const uploadToCloudinary = (buffer, folder = 'flights') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (result) resolve(result.secure_url)
        else reject(error)
      }
    )
    streamifier.createReadStream(buffer).pipe(stream)
  })
}

// Validate flight data
const validateFlightData = (data, isUpdate = false) => {
  const errors = []
  
  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
      errors.push('Title is required and must be at least 3 characters')
    }
  }

  if (!isUpdate || data.overview !== undefined) {
    if (!data.overview || typeof data.overview !== 'string' || data.overview.trim().length < 10) {
      errors.push('Overview is required and must be at least 10 characters')
    }
  }

  if (!isUpdate || data.price !== undefined) {
    if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
      errors.push('Valid price is required and must be greater than 0')
    }
  }

  if (!isUpdate || data.category !== undefined) {
    const validCategories = ['vip', 'romantic offer', 'most reserved']
    if (data.category && !validCategories.includes(data.category)) {
      errors.push('Invalid category')
    }
  }

  if (data.program) {
    if (!Array.isArray(data.program)) {
      errors.push('Program must be an array')
    } else {
      data.program.forEach((item, index) => {
        if (!item.miniTitle || typeof item.miniTitle !== 'string' || item.miniTitle.trim().length < 2) {
          errors.push(`Program item ${index + 1}: miniTitle is required and must be at least 2 characters`)
        }
        if (!item.text || typeof item.text !== 'string' || item.text.trim().length < 5) {
          errors.push(`Program item ${index + 1}: text is required and must be at least 5 characters`)
        }
      })
    }
  }

  if (data.reviews) {
    if (!Array.isArray(data.reviews)) {
      errors.push('Reviews must be an array')
    } else {
      data.reviews.forEach((review, index) => {
        if (!review.name || typeof review.name !== 'string' || review.name.trim().length < 2) {
          errors.push(`Review ${index + 1}: name is required and must be at least 2 characters`)
        }
        if (!review.rating || typeof review.rating !== 'number' || review.rating < 1 || review.rating > 5) {
          errors.push(`Review ${index + 1}: rating is required and must be between 1 and 5`)
        }
        if (!review.comment || typeof review.comment !== 'string' || review.comment.trim().length < 5) {
          errors.push(`Review ${index + 1}: comment is required and must be at least 5 characters`)
        }
      })
    }
  }

  return errors.length > 0 ? errors : null
}

// Public - get all flights
export const getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find().select('-reviews._id -program._id')
    res.json(flights)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get flights', error: error.message })
  }
}

// Get a single flight by ID
export const getFlightById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flight ID' })
    }
    
    const flight = await Flight.findById(req.params.id).select('-reviews._id -program._id')
    if (!flight) return res.status(404).json({ message: 'Flight not found' })
    res.json(flight)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get flight', error: error.message })
  }
}

// Admin - create flight with images upload
export const createFlight = async (req, res) => {
  try {
    let program = [];
    let reviews = [];

    try {
      if (req.body.program) {
        program = JSON.parse(req.body.program);
        if (!Array.isArray(program)) throw new Error();
      }

      if (req.body.reviews) {
        reviews = JSON.parse(req.body.reviews);
        if (!Array.isArray(reviews)) throw new Error();
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          'Program must be an array',
          'Reviews must be an array'
        ]
      });
    }

    const price = Number(req.body.price);

    req.body.price = price
    req.body.program = program
    req.body.reviews = reviews

    // Validate input data
    const validationErrors = validateFlightData(req.body)
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation failed', errors: validationErrors })
    }

    // Check for required main image
    if (!req.files?.mainImage?.[0]) {
      return res.status(400).json({ message: 'Main image is required' })
    }

    // Prepare flight data
    const flightData = {
      title: req.body.title.trim(),
      overview: req.body.overview.trim(),
      price: Number(req.body.price),
      category: req.body.category || 'vip',
      program: req.body.program ? req.body.program.map(item => ({
        miniTitle: item.miniTitle.trim(),
        text: item.text.trim()
      })) : [],
      reviews: req.body.reviews || []
    }

    // Upload main image
    flightData.mainImage = await uploadToCloudinary(req.files.mainImage[0].buffer)

    // Upload additional images if provided
    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map(file => uploadToCloudinary(file.buffer))
      flightData.images = await Promise.all(uploadPromises)
    }

    // Create flight document
    const flight = await Flight.create(flightData)
    res.status(201).json({
      _id: flight._id,
      title: flight.title,
      overview: flight.overview,
      mainImage: flight.mainImage,
      images: flight.images,
      price: flight.price,
      category: flight.category
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create flight', error: error.message })
  }
}

// Admin - update flight, optionally updating images
export const updateFlight = async (req, res) => {
  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flight ID' })
    }

    let program = [];
    let reviews = [];

    try {
      if (req.body.program) {
        program = JSON.parse(req.body.program);
        if (!Array.isArray(program)) throw new Error();
      }

      if (req.body.reviews) {
        reviews = JSON.parse(req.body.reviews);
        if (!Array.isArray(reviews)) throw new Error();
      }
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: [
          'Program must be an array',
          'Reviews must be an array'
        ]
      });
    }

    const price = Number(req.body.price);

    req.body.price = price
    req.body.program = program
    req.body.reviews = reviews

    // Validate input data
    const validationErrors = validateFlightData(req.body, true)
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation failed', errors: validationErrors })
    }

    // Find existing flight
    const existingFlight = await Flight.findById(req.params.id)
    if (!existingFlight) {
      return res.status(404).json({ message: 'Flight not found' })
    }

    // Prepare update data
    const updateData = {
      title: req.body.title ? req.body.title.trim() : existingFlight.title,
      overview: req.body.overview ? req.body.overview.trim() : existingFlight.overview,
      price: req.body.price ? Number(req.body.price) : existingFlight.price,
      category: req.body.category || existingFlight.category,
      program: req.body.program 
        ? req.body.program.map(item => ({
            miniTitle: item.miniTitle.trim(),
            text: item.text.trim()
          }))
        : existingFlight.program,
      reviews: req.body.reviews || existingFlight.reviews,
      mainImage: existingFlight.mainImage,
      images: existingFlight.images
    }

    // Handle image updates
    if (req.files?.mainImage?.[0]) {
      updateData.mainImage = await uploadToCloudinary(req.files.mainImage[0].buffer)
    }

    if (req.files?.images?.length) {
      const uploadPromises = req.files.images.map(file => uploadToCloudinary(file.buffer))
      updateData.images = await Promise.all(uploadPromises)
    }

    // Update flight
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-reviews._id -program._id')

    res.json(updatedFlight)
  } catch (error) {
    res.status(500).json({ message: 'Failed to update flight', error: error.message })
  }
}

// Admin - delete flight
export const deleteFlight = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid flight ID' })
    }

    const deleted = await Flight.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Flight not found' })

    res.json({ message: 'Flight deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete flight', error: error.message })
  }
}