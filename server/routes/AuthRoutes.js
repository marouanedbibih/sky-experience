import { Router } from 'express'
import { login, logout, createAdmin } from '../controllers/AuthController.js'
import { verifyToken } from '../middlewares/AuthMiddleware.js'

const authRoutes = Router()

authRoutes.post('/login', login)
authRoutes.post('/logout', logout)
authRoutes.post('/admin', createAdmin)


export default authRoutes