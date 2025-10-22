import React, { useState } from 'react';
import { Calendar, X, Phone, Mail, MapPin, User, Clock, DollarSign, Check } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from "../config/api";

// Mock flight data - replace with actual props
const mockFlight = {
  _id: '507f1f77bcf86cd799439011',
  name: 'Private Hot-Air Balloon Flight in Marrakech',
  price: 450,
  location: 'Marrakech'
};

const FlightReservation = ({ flight = mockFlight }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date()); // May 2025
  const [selectedDate, setSelectedDate] = useState(null);
  const [travelers, setTravelers] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    pickUpLocation: ''
  });

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay() + 1); // Start from Monday
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isDateSelected = (date) => {
    return selectedDate && 
           date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const calculateTotal = () => {
    return flight.price * travelers;
  };

  const handleDateSelect = (date) => {
    if (!isDateDisabled(date)) {
      setSelectedDate(date);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitReservation = async () => {
    setLoading(true);
    try {
      const reservationData = {
        date: selectedDate,
        travelers: travelers,
        total: calculateTotal(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        pickUpLocation: formData.pickUpLocation,
        flight: flight._id
      };

      // REPLACE THIS SECTION WITH YOUR ACTUAL API CALL:
      const response = await axios.post(`${API_BASE_URL}/api/reservations`, reservationData);
      if (response.status === 200 || response.status === 201) {
        setCurrentStep(4);
      } else {
        throw new Error('Reservation failed');
      }
      
      // // For demo purposes, simulate API call
      // await new Promise(resolve => setTimeout(resolve, 2000));
      // console.log('Reservation data:', reservationData);
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Reservation failed:', error);
      alert('Reservation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedDate(null);
    setTravelers(1);
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      pickUpLocation: ''
    });
    setShowModal(false);
  };

  const navigateToBookings = () => {
    // REPLACE WITH YOUR NAVIGATION LOGIC:
    // For React Router: navigate('/booking');
    // For Next.js: router.push('/booking');
    // For simple redirect:
    window.location.href = '/booking';
  };

  const canContinueStep1 = selectedDate && travelers > 0;
  const canContinueStep2 = formData.fullName && formData.email && formData.pickUpLocation;

  return (
    <>
      {/* Right Column: Calendar, Price, Buttons */}
      <div
        className="w-full md:w-80 flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 mt-4 md:mt-0"
        style={{
          minHeight: "480px",
          justifyContent: "flex-start",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          borderRadius: "20px"
        }}
      >
        {/* Calendar Preview */}
        <div className="w-full mb-6">
          <div className="flex justify-between items-center mb-2">
            <button 
              onClick={() => navigateMonth(-1)}
              className="text-xl font-bold bg-transparent border-none cursor-pointer hover:text-gray-600"
            >
              &lt;
            </button>
            <div className="text-lg font-bold">
              {currentDate.toLocaleDateString('en-US', { month: 'long' })} 
              <span className="font-normal"> {currentDate.getFullYear()}</span>
            </div>
            <button 
              onClick={() => navigateMonth(1)}
              className="text-xl font-bold bg-transparent border-none cursor-pointer hover:text-gray-600"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1 w-full">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <div key={d}>{d}</div>)}
          </div>
          <div className="grid grid-cols-7 text-center text-sm gap-1 w-full">
            {generateCalendarDays().slice(0, 30).map((date, i) => (
              <div 
                key={i} 
                className={`py-1 cursor-pointer hover:bg-gray-100 rounded ${
                  date.getMonth() !== currentDate.getMonth() ? 'text-gray-300' : ''
                } ${isDateDisabled(date) ? 'text-gray-300 cursor-not-allowed' : ''}`}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>
                    
        <div className="w-full flex flex-row justify-between items-center mb-4">
          <span className="font-bold text-lg">Price :</span>
          <span className="text-3xl font-extrabold text-[#e74c3c]">${flight.price}</span>
        </div>
                    
        <button 
          onClick={() => setShowModal(true)}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg mb-3 transition"
        >
          Check Availability
        </button>
        <a href="tel:+212661445327" className="w-full flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded-lg transition">
          CONTACT
        </a>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-orange-50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">{flight.title}</h2>
              <button 
                onClick={resetModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 py-4 border-b">
              <div className="flex items-center justify-center mb-2">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step < currentStep ? <Check size={16} /> : step}
                    </div>
                    {step < 4 && <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                    }`} />}
                  </div>
                ))}
              </div>
              <div className="text-sm flex justify-center mt-4 text-gray-600">
                {
                  currentStep === 1 ? 'Select Date & Travelers' :
                  currentStep === 2 ? 'Contact Information' :
                  currentStep === 3 ? 'Review Booking' :
                  'Confirmation'
                }
              </div>
            </div>

            {/* Step Content */}
            <div className="p-6">
              {/* Step 1: Date & Travelers Selection */}
              {currentStep === 1 && (
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Calendar */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4">Select Your Date</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <button 
                          onClick={() => navigateMonth(-1)}
                          className="p-2 hover:bg-gray-200 rounded"
                        >
                          &lt;
                        </button>
                        <div className="text-lg font-bold">
                          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                        </div>
                        <button 
                          onClick={() => navigateMonth(1)}
                          className="p-2 hover:bg-gray-200 rounded"
                        >
                          &gt;
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-600 mb-2">
                        {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
                          <div key={d} className="p-2">{d}</div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendarDays().map((date, i) => (
                          <button
                            key={i}
                            onClick={() => handleDateSelect(date)}
                            disabled={isDateDisabled(date)}
                            className={`p-2 text-sm rounded hover:bg-blue-100 transition ${
                              date.getMonth() !== currentDate.getMonth() ? 'text-gray-300' : ''
                            } ${isDateDisabled(date) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${
                              isDateSelected(date) ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                            }`}
                          >
                            {date.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="w-full lg:w-80">
                    <div className="bg-orange-200 p-6 rounded-lg sticky top-0">
                      <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
                      
                      {selectedDate && (
                        <div className="mb-4 p-3 bg-white rounded border">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <Calendar size={16} />
                            Selected Date
                          </div>
                          <div className="font-medium">{formatDate(selectedDate)}</div>
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Number of Travelers</label>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="font-bold text-lg w-8 text-center">{travelers}</span>
                          <button 
                            onClick={() => setTravelers(travelers + 1)}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span>Price per person</span>
                          <span>${flight.price}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span>Travelers</span>
                          <span>×{travelers}</span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg text-red-600 border-t pt-2">
                          <span>Total</span>
                          <span>${calculateTotal()}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setCurrentStep(2)}
                        disabled={!canContinueStep1}
                        className={`w-full py-3 rounded-lg font-bold transition ${
                          canContinueStep1 
                            ? 'bg-green-500 text-white hover:bg-green-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <User className="inline mr-1" size={16} />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Mail className="inline mr-1" size={16} />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Phone className="inline mr-1" size={16} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <MapPin className="inline mr-1" size={16} />
                        Pick-up Location *
                      </label>
                      <input
                        type="text"
                        name="pickUpLocation"
                        value={formData.pickUpLocation}
                        onChange={handleFormChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter pick-up location"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={() => setCurrentStep(3)}
                      disabled={!canContinueStep2}
                      className={`flex-1 py-3 rounded-lg font-bold transition ${
                        canContinueStep2 
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Booking */}
              {currentStep === 3 && (
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold mb-6">Review Your Booking</h3>
                  
                  <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Flight:</span>
                      <span>{flight.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Date:</span>
                      <span>{selectedDate ? formatDate(selectedDate) : 'Not selected'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Travelers:</span>
                      <span>{travelers} person{travelers > 1 ? 's' : ''}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Full Name:</span>
                      <span>{formData.fullName}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Email:</span>
                      <span>{formData.email}</span>
                    </div>
                    
                    {formData.phoneNumber && (
                      <div className="flex justify-between">
                        <span className="font-medium">Phone:</span>
                        <span>{formData.phoneNumber}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="font-medium">Pick-up Location:</span>
                      <span>{formData.pickUpLocation}</span>
                    </div>
                    
                    <div className="border-t pt-4 flex justify-between text-xl font-bold text-red-600">
                      <span>Total Amount:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button 
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button 
                      onClick={handleSubmitReservation}
                      disabled={loading}
                      className="flex-1 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="max-w-md mx-auto text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-green-600" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Reservation Successful!
                  </h3>
                  
                  <p className="text-gray-600 mb-8">
                    Your booking has been confirmed. You will receive a confirmation email shortly with all the details.
                  </p>
                  
                  <div className="space-y-3">
                    {/* <button 
                      onClick={navigateToBookings}
                      className="w-full py-3 bg-blue-700 text-white rounded-lg font-bold hover:bg-blue-800"
                    >
                      View My Bookings
                    </button> */}
                    <button 
                      onClick={resetModal}
                      className="w-full py-3 border border-gray-300 rounded-lg font-bold hover:bg-gray-50"
                    >
                      Book Another Flight
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlightReservation;