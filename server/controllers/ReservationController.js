import Reservation from '../models/Reservation.js'
import mongoose from 'mongoose'
import Flight from '../models/Flight.js'

// Validate reservation data
const validateReservationData = (data) => {
  const errors = []
  
  // Date validation
  if (!data.date || !(data.date instanceof Date || !isNaN(new Date(data.date).getTime()))) {
    errors.push('Valid date is required')
  } else if (new Date(data.date) < new Date()) {
    errors.push('Reservation date cannot be in the past')
  }

  // Travelers validation
  if (!data.travelers || typeof data.travelers !== 'number' || data.travelers < 1 || data.travelers > 20) {
    errors.push('Number of travelers must be between 1 and 20')
  }

  // Total price validation
  if (!data.total || typeof data.total !== 'number' || data.total <= 0) {
    errors.push('Valid total price is required and must be greater than 0')
  }

  // Full name validation
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.push('Full name is required and must be at least 2 characters')
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Valid email is required')
  }

  // Phone number validation (optional)
  if (data.phoneNumber && typeof data.phoneNumber !== 'string') {
    errors.push('Phone number must be a string if provided')
  }

  // Pickup location validation
  if (!data.pickUpLocation || typeof data.pickUpLocation !== 'string' || data.pickUpLocation.trim().length < 3) {
    errors.push('Pickup location is required and must be at least 3 characters')
  }

  // Flight ID validation
  if (!data.flight || !mongoose.Types.ObjectId.isValid(data.flight)) {
    errors.push('Valid flight reference is required')
  }

  return errors.length > 0 ? errors : null
}

// Create a new reservation (Public)
export const createReservation = async (req, res) => {
  try {
    // Validate input data
    const validationErrors = validateReservationData(req.body)
    if (validationErrors) {
      return res.status(400).json({ message: 'Validation failed', errors: validationErrors })
    }

    // Verify flight exists
    const flightExists = await Flight.exists({ _id: req.body.flight })
    if (!flightExists) {
      return res.status(400).json({ message: 'Referenced flight does not exist' })
    }

    // Prepare reservation data
    const reservationData = {
      date: new Date(req.body.date),
      travelers: req.body.travelers,
      total: req.body.total,
      fullName: req.body.fullName.trim(),
      email: req.body.email.trim().toLowerCase(),
      phoneNumber: req.body.phoneNumber ? req.body.phoneNumber.trim() : undefined,
      pickUpLocation: req.body.pickUpLocation.trim(),
      flight: req.body.flight
    }

    // Create reservation
    const reservation = await Reservation.create(reservationData)
    
    // Return response without internal fields
    res.status(201).json({
      _id: reservation._id,
      date: reservation.date,
      travelers: reservation.travelers,
      total: reservation.total,
      fullName: reservation.fullName,
      email: reservation.email,
      phoneNumber: reservation.phoneNumber,
      pickUpLocation: reservation.pickUpLocation,
      flight: reservation.flight,
      createdAt: reservation.createdAt
    })
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to create reservation', 
      error: error.message 
    })
  }
}

// Get all reservations (Admin)
export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('flight', 'title price') // Only include necessary flight fields
      .select('-__v -updatedAt') // Exclude unnecessary fields
      .sort({ createdAt: -1 }) // Newest first
    
    res.json(reservations)
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to get reservations', 
      error: error.message 
    })
  }
}

// Get one reservation by ID (Admin)
export const getReservationById = async (req, res) => {
  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid reservation ID' })
    }

    const reservation = await Reservation.findById(req.params.id)
      .populate('flight', 'title price mainImage') // Include needed flight fields
      .select('-__v -updatedAt') // Exclude unnecessary fields

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }
    
    res.json(reservation)
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to get reservation', 
      error: error.message 
    })
  }
}

// Delete a reservation by ID (Admin)
export const deleteReservation = async (req, res) => {
  try {
    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid reservation ID' })
    }

    const deleted = await Reservation.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Reservation not found' })
    }
    
    res.json({ 
      message: 'Reservation deleted successfully',
      deletedId: deleted._id
    })
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to delete reservation', 
      error: error.message 
    })
  }
}