import React, { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/home/Home';
import BookingPage from './pages/Booking/Booking';
import PrivateFlightPage from './pages/PrivateFlight/PrivateFlight';
import RoyalFlightPage from './pages/royalFlight/RoyalFlight';
import ClassicFlightPage from './pages/classicFlight/ClassicFlight';
import About from './pages/about/About';
import AnniversaireDetails from './pages/anniversaire/AnniversaireDetails';
import MariageDetails from './pages/mariage/MariageDetails';
import Contact from './pages/contact/contact';
import Layout from './admin/layout/layout';
import MainLayout from './pages/layout/MainLayout';
// Import admin pages
import Dashboard from './admin/Dashboard/Dashboard';
import AdminFlights from './admin/Flights/Flights';
import AdminReservations from './admin/Reservations/Reservations';
import Login from './auth/Login/Login';
import DetailsFlight from './pages/DetailsFlight/DetailsFlight';


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = Cookies.get("jwt");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? children : null;
};

function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!showContent) {
      const handleScroll = () => setShowContent(true);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showContent]);

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/private-flight" element={<PrivateFlightPage />} />
          <Route path="/royal-flight" element={<RoyalFlightPage />} />
          <Route path="/classic-flight" element={<ClassicFlightPage />} />
          <Route path="/anniversaire-flight" element={<AnniversaireDetails />} />
          <Route path="/mariage-flight" element={<MariageDetails />} />
          <Route path="/flights/:id" element={<DetailsFlight />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/*" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="reservations" element={<AdminReservations />} />
        </Route>

        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;