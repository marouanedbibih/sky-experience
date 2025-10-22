import { Router } from 'express'
import {
  createFlight,
  getAllFlights,
  getFlightById,
  updateFlight,
  deleteFlight,
  uploadFlightImages
} from '../controllers/FlightController.js'
import { verifyToken } from '../middlewares/AuthMiddleware.js'

const flightRoutes = Router()

// Public route
flightRoutes.get('/', getAllFlights)
flightRoutes.get('/:id', getFlightById)

// Admin only
flightRoutes.post('/', verifyToken, uploadFlightImages, createFlight)
flightRoutes.put('/:id', verifyToken, uploadFlightImages, updateFlight)
flightRoutes.delete('/:id', verifyToken, deleteFlight)

export default flightRoutes

