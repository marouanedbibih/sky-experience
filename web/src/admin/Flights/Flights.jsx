import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Star, 
  X, 
  Save,
  Upload,
  Search,
  Filter,
  User,
  Loader,
  Trash2Icon
} from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    mainImage: null,
    images: [],
    price: '',
    rating: 0,
    category: 'vip',
    program: [{ miniTitle: '', text: '' }]
  });

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    avatar: '',
    rating: 5,
    comment: ''
  });

  // Fetch flights from API
  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/flights`, {withCredentials: true});
      
      // Ensure each flight has a reviews array
      const flightsWithReviews = response.data.map(flight => ({
        ...flight,
        reviews: flight.reviews || []
      }));
      
      setFlights(flightsWithReviews);
      setError(null);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setError('Failed to load flights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // Filter flights based on search and category
  const filteredFlights = flights.filter(flight => {
    const matchesSearch = flight.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          flight.overview.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || flight.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      overview: '',
      mainImage: null,
      images: [],
      price: '',
      rating: 0,
      category: 'vip',
      program: [{ miniTitle: '', text: '' }]
    });
  };

  // Reset review form
  const resetReviewForm = () => {
    setReviewForm({
      name: '',
      avatar: '',
      rating: 5,
      comment: ''
    });
  };

  // Open modal for different actions
  const openModal = (mode, flight = null) => {
    setModalMode(mode);
    setSelectedFlight(flight);
    
    if (mode === 'edit' && flight) {
      setFormData({
        title: flight.title,
        overview: flight.overview,
        mainImage: flight.mainImage,
        images: flight.images || [],
        price: flight.price.toString(),
        rating: flight.rating,
        category: flight.category,
        program: flight.program && flight.program.length > 0 
          ? flight.program 
          : [{ miniTitle: '', text: '' }]
      });
    } else if (mode === 'create') {
      resetForm();
    }
    
    setShowModal(true);
  };

  // Open review modal
  const openReviewModal = (flight) => {
    setSelectedFlight(flight);
    resetReviewForm();
    setShowReviewModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
    resetForm();
  };

  // Close review modal
  const closeReviewModal = () => {
    setShowReviewModal(false);
    setSelectedFlight(null);
    resetReviewForm();
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('overview', formData.overview);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('program', JSON.stringify(formData.program));
      
      // Append main image if it's a file
      if (formData.mainImage instanceof File) {
        formDataToSend.append('mainImage', formData.mainImage);
      }
      
      // Append additional images
      formData.images.forEach((image, index) => {
        if (image instanceof File) {
          formDataToSend.append('images', image);
        }
      });
      
      let response;
      if (modalMode === 'create') {
        response = await axios.post(`${API_BASE_URL}/api/flights`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        setFlights([...flights, response.data]);
      } else if (modalMode === 'edit') {
        response = await axios.put(`${API_BASE_URL}/api/flights/${selectedFlight._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        setFlights(flights.map(flight => 
          flight._id === selectedFlight._id ? response.data : flight
        ));
      }
      
      closeModal();
    } catch (err) {
      console.error('Error saving flight:', err);
      setError('Failed to save flight. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Handle review submission - FIXED
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFlight) return;
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/flights/${selectedFlight._id}/reviews`, 
        reviewForm, 
        { withCredentials: true }
      );
      
      // Update flights state with the complete updated flight data from server
      setFlights(prevFlights =>
        prevFlights.map(flight => {
          if (flight._id === selectedFlight._id) {
            return {
              ...flight,
              // Use the complete reviews array from server response
              reviews: response.data.reviews || [...(flight.reviews || []), response.data.review],
              rating: response.data.newRating || flight.rating
            };
          }
          return flight;
        })
      );
      
      // Update selectedFlight for the modal view
      if (modalMode === 'view') {
        setSelectedFlight(prev => ({
          ...prev,
          reviews: response.data.reviews || [...(prev.reviews || []), response.data.review],
          rating: response.data.newRating || prev.rating
        }));
      }
      
      closeReviewModal();
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to add review. Please try again.');
    }
  };

  // Handle delete review - FIXED
  const handleDeleteReview = async (flightId, reviewId) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/flights/${flightId}/reviews/${reviewId}`,
        { withCredentials: true }
      );

      // Update flights state with server response
      setFlights(prevFlights =>
        prevFlights.map(flight => {
          if (flight._id === flightId) {
            return {
              ...flight,
              // Use the updated reviews array from server response
              reviews: response.data.reviews || flight.reviews.filter(r => r._id !== reviewId),
              rating: response.data.newRating || flight.rating
            };
          }
          return flight;
        })
      );

      // Update selectedFlight for the modal view
      if (selectedFlight && selectedFlight._id === flightId) {
        setSelectedFlight(prev => ({
          ...prev,
          reviews: response.data.reviews || prev.reviews.filter(r => r._id !== reviewId),
          rating: response.data.newRating || prev.rating
        }));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      setError("Failed to delete review. Please try again.");
    }
  };


  // Delete flight
  const deleteFlight = async (flightId) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    
    try {
      await axios.delete(`${API_BASE_URL}/api/flights/${flightId}`, {withCredentials: true});
      setFlights(flights.filter(flight => flight._id !== flightId));
    } catch (err) {
      console.error('Error deleting flight:', err);
      setError('Failed to delete flight. Please try again.');
    }
  };

  // Handle image upload
  const handleImageUpload = (e, field, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (field === 'mainImage') {
      setFormData({ ...formData, mainImage: file });
    } else if (field === 'images' && index !== null) {
      const newImages = [...formData.images];
      newImages[index] = file;
      setFormData({ ...formData, images: newImages });
    }
  };

  // Add program item
  const addProgramItem = () => {
    setFormData({
      ...formData,
      program: [...formData.program, { miniTitle: '', text: '' }]
    });
  };

  // Remove program item
  const removeProgramItem = (index) => {
    setFormData({
      ...formData,
      program: formData.program.filter((_, i) => i !== index)
    });
  };

  // Update program item
  const updateProgramItem = (index, field, value) => {
    const newProgram = [...formData.program];
    newProgram[index][field] = value;
    setFormData({ ...formData, program: newProgram });
  };

  // Add image field
  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, null]
    });
  };

  // Remove image field
  const removeImageField = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    });
  };

  // Display image preview or URL
  const displayImage = (image) => {
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    return image;
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto text-[#b94c2a]" size={48} />
          <p className="text-[#b94c2a] mt-4">Loading flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br max-w-[100vw] from-orange-50 to-amber-50 min-h-screen">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
          <button 
            className="absolute top-0 right-0 p-3" 
            onClick={() => setError(null)}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-[#b94c2a] rounded-2xl">
            <Plane className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-[#b94c2a]">Flight Management</h1>
            <p className="text-[#b94c2a]/70 text-lg">Manage your flight experiences and tours</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex max-md:flex-col gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
              <input
                type="text"
                placeholder="Search flights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-[#b94c2a]/50" size={20} />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 bg-white appearance-none"
              >
                <option value="all">All Categories</option>
                <option value="vip">VIP</option>
                <option value="romantic offer">Romantic Offer</option>
                <option value="most reserved">Most Reserved</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => openModal('create')}
            className="bg-[#b94c2a] text-white px-6 py-3 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center gap-2 font-semibold"
          >
            <Plus size={20} />
            Add New Flight
          </button>
        </div>
      </div>

      {/* Flights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlights.map(flight => (
          <div key={flight._id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#eec09a]/30 hover:shadow-xl transition-shadow">
            <div className="relative">
              <img 
                src={flight.mainImage} 
                alt={flight.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#b94c2a] text-white px-3 py-1 rounded-full text-sm font-semibold">
                {flight.category}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="text-xl font-bold text-[#b94c2a] mb-2 line-clamp-2">{flight.title}</h3>
              <p className="text-[#b94c2a]/70 mb-4 line-clamp-3">{flight.overview}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500 fill-current" size={16} />
                  <span className="text-[#b94c2a] font-semibold">{(flight.rating || 0).toFixed(1)}</span>
                </div>
                <div className="text-2xl font-bold text-[#b94c2a]">
                  ${flight.price}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => openModal('view', flight)}
                  className="flex-1 bg-[#eec09a]/20 text-[#b94c2a] py-2 px-4 rounded-lg hover:bg-[#eec09a]/30 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  View
                </button>
                <button
                  onClick={() => openModal('edit', flight)}
                  className="flex-1 bg-blue-100 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit3 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => deleteFlight(flight._id)}
                  className="flex-1 bg-red-100 text-red-600 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>

              {/* Add Review Button */}
              <button
                onClick={() => openReviewModal(flight)}
                className="w-full mt-3 bg-green-100 text-green-600 py-2 px-4 rounded-lg hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                Add Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredFlights.length === 0 && (
        <div className="text-center py-16">
          <Plane className="mx-auto text-[#b94c2a]/30 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-[#b94c2a]/50 mb-2">No flights found</h3>
          <p className="text-[#b94c2a]/40">
            {searchTerm || categoryFilter !== 'all' 
              ? 'Try adjusting your search or filter criteria' 
              : 'Start by adding your first flight experience'
            }
          </p>
        </div>
      )}

      {/* Flight Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#eec09a]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#b94c2a]">
                {modalMode === 'create' ? 'Add New Flight' : 
                 modalMode === 'edit' ? 'Edit Flight' : 'Flight Details'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-[#b94c2a]" size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'view' ? (
                // View Mode
                <div className="space-y-6">
                  <img 
                    src={selectedFlight.mainImage} 
                    alt={selectedFlight.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                  <div>
                    <h3 className="text-2xl font-bold text-[#b94c2a] mb-2">{selectedFlight.title}</h3>
                    <p className="text-[#b94c2a]/70 mb-4">{selectedFlight.overview}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Price</div>
                        <div className="text-2xl font-bold text-[#b94c2a]">${selectedFlight.price}</div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Rating</div>
                        <div className="text-2xl font-bold text-[#b94c2a] flex items-center gap-1">
                          <Star className="text-yellow-500 fill-current" size={20} />
                          {selectedFlight.rating?.toFixed(1) || '0.0'}
                        </div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Category</div>
                        <div className="text-lg font-semibold text-[#b94c2a] capitalize">{selectedFlight.category}</div>
                      </div>
                      <div className="bg-[#eec09a]/20 p-4 rounded-xl">
                        <div className="text-[#b94c2a]/60 text-sm">Reviews</div>
                        <div className="text-2xl font-bold text-[#b94c2a]">{selectedFlight.reviews?.length || 0}</div>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  {selectedFlight.program && selectedFlight.program.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-[#b94c2a] mb-4">Flight Program</h4>
                      <div className="space-y-3">
                        {selectedFlight.program.map((item, index) => (
                          <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                            <h5 className="font-semibold text-[#b94c2a] mb-2">{item.miniTitle}</h5>
                            <p className="text-[#b94c2a]/70">{item.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reviews */}
                  {selectedFlight.reviews && selectedFlight.reviews.length > 0 && (
                    <div>
                      <h4 className="text-xl font-bold text-[#b94c2a] mb-4">Reviews</h4>
                      <div className="space-y-4">
                        {(selectedFlight.reviews || []).map((review, index) => (
                          <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                            <div className="flex items-center gap-3 mb-2">
                              {review.avatar ? (
                                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                              ) : (
                                <div className="w-10 h-10 bg-[#b94c2a] rounded-full flex items-center justify-center text-white font-bold">
                                  {review.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <div className="font-semibold text-[#b94c2a]">{review.name}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} 
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-[#b94c2a]/70">{review.comment}</p>
                            <div className="text-sm text-[#b94c2a]/50 mt-2">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </div>
                            <div className='flex justify-end'>
                              <button onClick={()=> handleDeleteReview(selectedFlight._id, review._id)}>
                                <Trash2Icon className='text-red-500' />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Create/Edit Mode
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="Enter flight title"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                      >
                        <option value="vip">VIP</option>
                        <option value="romantic offer">Romantic Offer</option>
                        <option value="most reserved">Most Reserved</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#b94c2a] font-semibold mb-2">Overview</label>
                    <textarea
                      required
                      value={formData.overview}
                      onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                      className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 h-24"
                      placeholder="Enter flight overview"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Price ($)</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-[#b94c2a] font-semibold mb-2">Rating</label>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                        placeholder="0.0"
                      />
                    </div>
                  </div>

                  {/* Main Image */}
                  <div>
                    <label className="block text-[#b94c2a] font-semibold mb-2">
                      Main Image {modalMode === 'edit' && '(Leave empty to keep current)'}
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'mainImage')}
                        className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                      />
                      {formData.mainImage && (
                        <img 
                          src={displayImage(formData.mainImage)} 
                          alt="Preview" 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                    </div>
                  </div>

                  {/* Additional Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[#b94c2a] font-semibold">
                        Additional Images {modalMode === 'edit' && '(Leave empty to keep current)'}
                      </label>
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-[#b94c2a] hover:bg-[#eec09a]/20 p-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'images', index)}
                            className="flex-1 p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                          />
                          {image && (
                            <img 
                              src={displayImage(image)} 
                              alt="Preview" 
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          {formData.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="p-3 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                            >
                              <X size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[#b94c2a] font-semibold">Flight Program</label>
                      <button
                        type="button"
                        onClick={addProgramItem}
                        className="text-[#b94c2a] hover:bg-[#eec09a]/20 p-2 rounded-lg transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {formData.program.map((item, index) => (
                        <div key={index} className="bg-[#eec09a]/10 p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#b94c2a] font-medium">Program Item {index + 1}</span>
                            {formData.program.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeProgramItem(index)}
                                className="text-red-500 hover:bg-red-100 p-1 rounded"
                              >
                                <X size={16} />
                              </button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={item.miniTitle}
                              onChange={(e) => updateProgramItem(index, 'miniTitle', e.target.value)}
                              className="p-3 border border-[#eec09a]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                              placeholder="Mini title"
                            />
                            <input
                              type="text"
                              value={item.text}
                              onChange={(e) => updateProgramItem(index, 'text', e.target.value)}
                              className="p-3 border border-[#eec09a]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                              placeholder="Description"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-4 pt-6 border-t border-[#eec09a]/30">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="flex-1 bg-[#b94c2a] text-white py-3 px-6 rounded-xl hover:bg-[#a03d22] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      {uploading ? (
                        <Loader className="animate-spin" size={20} />
                      ) : (
                        <>
                          <Save size={20} />
                          {modalMode === 'create' ? 'Create Flight' : 'Update Flight'}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedFlight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-[#eec09a]/30 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#b94c2a]">
                Add Review for {selectedFlight.title}
              </h2>
              <button
                onClick={closeReviewModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="text-[#b94c2a]" size={24} />
              </button>
            </div>

            {/* Review Form */}
            <form onSubmit={handleReviewSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Avatar URL (Optional)</label>
                <input
                  type="url"
                  value={reviewForm.avatar}
                  onChange={(e) => setReviewForm({ ...reviewForm, avatar: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1"
                    >
                      <Star
                        size={28}
                        className={star <= reviewForm.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                  <span className="text-lg font-semibold text-[#b94c2a] ml-2">
                    {reviewForm.rating}/5
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[#b94c2a] font-semibold mb-2">Comment</label>
                <textarea
                  required
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 h-32"
                  placeholder="Share your experience..."
                />
              </div>

              <div className="flex gap-4 pt-4 border-t border-[#eec09a]/30">
                <button
                  type="button"
                  onClick={closeReviewModal}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#b94c2a] text-white py-3 px-6 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center justify-center gap-2 font-semibold"
                >
                  <Save size={20} />
                  Add Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFlights;