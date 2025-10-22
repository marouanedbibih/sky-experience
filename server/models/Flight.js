// models/Flight.js
import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
},{ timestamps: true })

const programSchema = new mongoose.Schema({
  miniTitle: { type: String, required: true },
  text: { type: String, required: true },
})

const flightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  mainImage: { type: String, required: true },
  images: [String],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  program: [programSchema],
  category: {
    type: String,
    enum: ['vip', 'romantic offer', 'most reserved'],
    default: 'vip',
  },
  reviews: [reviewSchema],
},{ timestamps: true })

export default mongoose.model('Flight', flightSchema)
