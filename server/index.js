import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/AuthRoutes.js';
import contactRoutes from './routes/Contact.js';
import reservationRoutes from './routes/Reservations.js';
import flightRoutes from './routes/Flights.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());

app.use(cors({
  origin:[process.env.ORIGIN],
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true
}))

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);


connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
