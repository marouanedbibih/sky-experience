import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../config/api';

export default function BookingPage() {
  const scrollRef = useRef(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, []);

  useEffect(() => {
    // Check if we need to show arrows based on content width
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    return () => {
      window.removeEventListener('resize', checkScroll);
    };
  }, [flights]);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/flights`);
      setFlights(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load flights. Please try again later.');
      console.error('Error fetching flights:', err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const cardWidth = 350; // width of a card including gap
      if (direction === "left") {
        current.scrollBy({ left: -cardWidth, behavior: "smooth" });
      } else {
        current.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
      
      // Update arrow visibility after scroll
      setTimeout(() => {
        const { scrollWidth, clientWidth, scrollLeft } = current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }, 300);
    }
  };

  // Function to get badge style based on category
  const getBadgeStyle = (category) => {
    switch (category?.toLowerCase()) {
      case 'vip':
        return { bg: '#ff5e5e', text: 'VIP' };
      case 'romantic offer':
        return { bg: '#e17055', text: 'Romantic offer' };
      case 'most reserved':
        return { bg: '#f39c12', text: 'Most reserved' };
      default:
        return { bg: '#d35400', text: 'Special' };
    }
  };

  // Function to generate slug for URLs
  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d35400] mb-4"></div>
          <div className="text-2xl text-[#3d2c1e]">Loading amazing flights...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex items-center justify-center py-12">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={fetchFlights}
            className="bg-[#d35400] text-white px-6 py-2 rounded-full font-bold hover:bg-[#e67e22] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f8f6] to-[#e8e7e5] flex flex-col items-center py-8">
      {/* Header Section */}
      <div className="w-full pb-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#3d2c1e] text-center pt-4 mb-8">Our Flights</h1>
        <div className="mx-auto w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg">
          <img
            src="/images/ourflight.png"
            alt="Our Flights"
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>
      
      {/* Description Section */}
      <div className="w-full max-w-4xl text-center mb-12 px-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#d35400] mb-4">Your Hot-Air Balloon Adventure</h2>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          Each hot-air balloon ride is a unique experience, offering you stunning views of Marrakech, 
          the Atlas Mountains, and the lush palm groves that surround the city. Choose your perfect adventure below.
        </p>
      </div>

      {/* Flights Section */}
      <div className="w-full max-w-7xl px-4 mb-12">
        <h3 className="text-2xl font-bold text-[#3d2c1e] mb-6 ml-2">Available Flights</h3>
        
        <div className="relative">
          {/* Left Arrow - Only show if needed */}
          {showLeftArrow && (
            <button
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              className="absolute left-0 z-10 bg-white/90 hover:bg-white text-[#d35400] rounded-full shadow-lg p-3 -translate-y-1/2 hidden md:block"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M15 19l-7-7 7-7" stroke="#d35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
          
          {/* Scrollable Cards Container */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto pb-6 px-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={() => {
              if (scrollRef.current) {
                const { scrollWidth, clientWidth, scrollLeft } = scrollRef.current;
                setShowLeftArrow(scrollLeft > 0);
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
              }
            }}
          >
            <div className="flex flex-row gap-6">
              {flights.map((flight) => {
                const badge = getBadgeStyle(flight.category);
                const slug = generateSlug(flight.title);
                
                return (
                  <div key={flight._id} className="flex-none w-[320px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
                    <div className="relative">
                      <img 
                        src={flight.mainImage || "/images/default-flight.png"} 
                        alt={flight.title} 
                        className="w-full h-48 object-cover" 
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='350' height='200' viewBox='0 0 350 200'%3E%3Crect width='350' height='200' fill='%23f0f0f0'/%3E%3Cpath d='M175 100 L200 125 L225 100 L250 125 L275 100' stroke='%23d35400' stroke-width='2' fill='none'/%3E%3Ccircle cx='175' cy='100' r='15' fill='%23d35400'/%3E%3C/svg%3E";
                        }}
                      />
                      <span 
                        className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-xl shadow-md"
                        style={{ backgroundColor: badge.bg }}
                      >
                        {badge.text}
                      </span>
                    </div>
                    
                    <div className="p-5">
                      <div className="mb-3">
                        <h4 className="font-bold text-lg text-black mb-1">
                          {flight.title.toUpperCase()}
                        </h4>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {flight.overview.length > 50 ? `${flight.overview.substring(0, 50)}...` : flight.overview}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="text-sm font-bold">
                            {flight.rating > 0 ? `${flight.rating}/5` : 'New'}
                          </span>
                        </div>
                        
                        <div className="text-lg font-bold text-[#d35400]">
                          ${flight.price}
                        </div>
                      </div>
                      
                      <div className="mt-5">
                        <a 
                          href={`/flights/${flight._id}`} 
                          className="block w-full bg-[#d35400] text-white text-center py-2 rounded-xl font-bold text-sm hover:bg-[#e67e22] transition-colors"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Right Arrow - Only show if needed */}
          {showRightArrow && (
            <button
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              className="absolute right-0 z-10 bg-white/90 hover:bg-white text-[#d35400] rounded-full shadow-lg p-3 -translate-y-1/2 hidden md:block"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7" stroke="#d35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
        
        {/* Scroll indicator for mobile */}
        {flights.length > 1 && (
          <div className="text-center mt-4 text-sm text-gray-500 md:hidden">
            ← Scroll to see more flights →
          </div>
        )}
      </div>
    </div>
  );
}