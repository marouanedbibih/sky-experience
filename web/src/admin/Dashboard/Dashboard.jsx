import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  DollarSign, 
  Plane, 
  Calendar, 
  Users, 
  TrendingUp, 
  Star,
  MapPin,
  Mail,
  Clock,
  Heart,
  Award,
  ChevronRight,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import API_BASE_URL from '../../config/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  const [recentReservations, setRecentReservations] = useState([]);
  const [topFlights, setTopFlights] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/dashboard/overview`, {withCredentials: true});
      
      
      const data = response.data;
      
      setStats(data.stats);
      setRecentReservations(data.recentReservations);
      setTopFlights(data.topFlights);
      setCategoryStats(data.categoryStats);
      setError(null);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
      // Load mock data as fallback
      loadMockData();
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    setStats({
      totalRevenue: 87450,
      totalFlights: 42,
      totalReservations: 1847,
      totalCustomers: 3256,
      revenueGrowth: 18,
      flightsGrowth: 12,
      reservationsGrowth: 25,
      customersGrowth: 31
    });

    setRecentReservations([
      {
        _id: '1',
        fullName: 'Sarah Johnson',
        email: 'sarah@email.com',
        phoneNumber: '+1234567890',
        date: new Date('2025-08-30'),
        travelers: 2,
        total: 1250,
        pickUpLocation: 'City Center',
        status: 'confirmed',
        flight: {
          _id: 'f1',
          title: 'Romantic Sunset Flight',
          category: 'romantic offer',
          price: 625,
          rating: 4.9
        },
        createdAt: new Date('2025-08-25')
      },
      {
        _id: '2',
        fullName: 'Michael Chen',
        email: 'michael@email.com',
        phoneNumber: '+1234567891',
        date: new Date('2025-09-02'),
        travelers: 4,
        total: 2800,
        pickUpLocation: 'Airport Terminal',
        status: 'pending',
        flight: {
          _id: 'f2',
          title: 'VIP City Tour',
          category: 'vip',
          price: 700,
          rating: 4.8
        },
        createdAt: new Date('2025-08-28')
      },
      {
        _id: '3',
        fullName: 'Emma Davis',
        email: 'emma@email.com',
        phoneNumber: '+1234567892',
        date: new Date('2025-09-05'),
        travelers: 1,
        total: 950,
        pickUpLocation: 'Beach Resort',
        status: 'confirmed',
        flight: {
          _id: 'f3',
          title: 'Adventure Explorer',
          category: 'most reserved',
          price: 950,
          rating: 4.7
        },
        createdAt: new Date('2025-08-30')
      }
    ]);

    setTopFlights([
      {
        _id: 'f1',
        title: 'Romantic Sunset Flight',
        overview: 'Experience breathtaking views during golden hour',
        category: 'romantic offer',
        rating: 4.9,
        price: 625,
        reservationCount: 89,
        totalRevenue: 55625
      },
      {
        _id: 'f2',
        title: 'VIP City Explorer',
        overview: 'Luxury helicopter tour with premium service',
        category: 'vip',
        rating: 4.8,
        price: 700,
        reservationCount: 67,
        totalRevenue: 46900
      },
      {
        _id: 'f3',
        title: 'Adventure Seeker',
        overview: 'Thrilling flight for adventure enthusiasts',
        category: 'most reserved',
        rating: 4.7,
        price: 450,
        reservationCount: 156,
        totalRevenue: 70200
      }
    ]);

    setCategoryStats({
      vip: { count: 18, revenue: 126000 },
      'romantic offer': { count: 12, revenue: 98500 },
      'most reserved': { count: 12, revenue: 87600 }
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'vip': return <Award className="w-4 h-4 text-yellow-600" />;
      case 'romantic offer': return <Heart className="w-4 h-4 text-pink-600" />;
      case 'most reserved': return <TrendingUp className="w-4 h-4 text-green-600" />;
      default: return <Plane className="w-4 h-4 text-blue-600" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'vip': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'romantic offer': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'most reserved': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'pending': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto text-[#b94c2a]" size={48} />
          <p className="mt-4 text-[#b94c2a]">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const statsCards = [
    { 
      title: 'Total Revenue', 
      value: formatCurrency(stats.totalRevenue || 0), 
      icon: DollarSign, 
      color: 'bg-gradient-to-br from-green-500 to-green-600', 
      change: `+${stats.revenueGrowth || 0}%`,
      description: `From ${stats.totalReservations || 0} reservations`
    },
    { 
      title: 'Active Flights', 
      value: stats.totalFlights || 0, 
      icon: Plane, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600', 
      change: `+${stats.flightsGrowth || 0}%`,
      description: 'Across all categories'
    },
    { 
      title: 'Total Reservations', 
      value: stats.totalReservations?.toLocaleString() || '0', 
      icon: Calendar, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600', 
      change: `+${stats.reservationsGrowth || 0}%`,
      description: 'This month'
    },
    { 
      title: 'Happy Travelers', 
      value: stats.totalCustomers?.toLocaleString() || '0', 
      icon: Users, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600', 
      change: `+${stats.customersGrowth || 0}%`,
      description: 'Total customers served'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl py-2 font-bold bg-gradient-to-r from-[#b94c2a] to-[#d4934a] bg-clip-text text-transparent mb-4">
            Flight Dashboard
          </h1>
          <p className="text-[#b94c2a]/70 text-lg">Manage your flight booking business with ease</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            <p className="font-semibold">Error loading dashboard data</p>
            <p className="text-sm">{error} - Showing sample data</p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <div key={index} className="group bg-white/80 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/50 hover:transform hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white" size={28} />
                </div>
                <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="font-semibold text-xs">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-[#b94c2a]/60 text-sm font-medium mb-2">{stat.title}</h3>
              <p className="text-3xl font-bold text-[#b94c2a] mb-1">{stat.value}</p>
              <p className="text-xs text-[#b94c2a]/50">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Recent Reservations */}
          <div className="xl:col-span-2 bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#b94c2a] flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Recent Reservations
              </h3>
              <button className="text-[#b94c2a] hover:bg-[#eec09a]/20 px-3 py-1 rounded-lg transition-colors">
                View All <ChevronRight className="inline w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentReservations.length > 0 ? recentReservations.map((reservation) => (
                <div key={reservation._id} className="bg-gradient-to-r from-white to-[#eec09a]/5 border border-[#eec09a]/30 rounded-2xl p-5 hover:shadow-lg transition-all duration-300 hover:border-[#eec09a]/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#b94c2a] to-[#d4934a] rounded-full flex items-center justify-center text-white font-bold">
                        {reservation.fullName?.split(' ').map(n => n[0]).join('') || 'N/A'}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#b94c2a]">{reservation.fullName || 'Unknown Customer'}</h4>
                        <p className="text-sm text-[#b94c2a]/60">{reservation.flight?.title || 'No Flight Info'}</p>
                        <div className="flex items-center gap-2 text-xs text-[#b94c2a]/50 mt-1">
                          <Mail className="w-3 h-3" />
                          {reservation.email || 'No email'}
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(reservation.status || 'pending')}`}>
                      {getStatusIcon(reservation.status || 'pending')}
                      {reservation.status || 'pending'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <Clock className="w-4 h-4" />
                      {reservation.date ? formatDate(reservation.date) : 'No date'}
                    </div>
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <Users className="w-4 h-4" />
                      {reservation.travelers || 0} travelers
                    </div>
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <DollarSign className="w-4 h-4" />
                      {formatCurrency(reservation.total || 0)}
                    </div>
                    <div className="flex items-center gap-1 text-[#b94c2a]/70">
                      <MapPin className="w-4 h-4" />
                      {reservation.pickUpLocation || 'No location'}
                    </div>
                  </div>

                  {reservation.flight?.category && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(reservation.flight.category)}`}>
                      {getCategoryIcon(reservation.flight.category)}
                      {reservation.flight.category}
                    </div>
                  )}
                </div>
              )) : (
                <div className="text-center py-8 text-[#b94c2a]/50">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No recent reservations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Flights */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-[#b94c2a] mb-6 flex items-center gap-2">
              <Plane className="w-6 h-6" />
              Top Flights
            </h3>
            <div className="space-y-4">
              {topFlights.length > 0 ? topFlights.map((flight) => (
                <div key={flight._id} className="bg-gradient-to-r from-[#eec09a]/10 to-white border border-[#eec09a]/30 rounded-2xl p-4 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-[#b94c2a] text-sm">{flight.title || 'Untitled Flight'}</h4>
                    {flight.rating && (
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-medium text-[#b94c2a]">{flight.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {flight.overview && (
                    <p className="text-xs text-[#b94c2a]/60 mb-3 line-clamp-2">{flight.overview}</p>
                  )}
                  
                  {flight.category && (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getCategoryColor(flight.category)}`}>
                      {getCategoryIcon(flight.category)}
                      {flight.category}
                    </div>
                  )}
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[#b94c2a]/70">
                      <span>Reservations:</span>
                      <span className="font-semibold">{flight.reservationCount || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#b94c2a]/70">
                      <span>Revenue:</span>
                      <span className="font-semibold text-green-600">{formatCurrency(flight.totalRevenue || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center text-[#b94c2a]/70">
                      <span>Price:</span>
                      <span className="font-semibold">{formatCurrency(flight.price || 0)}</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-[#b94c2a]/50">
                  <Plane className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No top flights found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions & System Overview */}
        <div className="grid">

          {/* Category Statistics */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/50">
            <h3 className="text-2xl font-bold text-[#b94c2a] mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Category Performance
            </h3>
            <div className="space-y-6">
              {Object.keys(categoryStats).length > 0 ? Object.entries(categoryStats).map(([category, data]) => {
                const totalFlights = Object.values(categoryStats).reduce((sum, cat) => sum + (cat.count || 0), 0);
                const totalRevenue = Object.values(categoryStats).reduce((sum, cat) => sum + (cat.revenue || 0), 0);
                const percentage = totalFlights > 0 ? ((data.count || 0) / totalFlights) * 100 : 0;
                
                return (
                  <div key={category} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category)}
                        <span className="text-sm text-[#b94c2a]/70 capitalize">{category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#b94c2a] text-sm">{data.count || 0} flights</div>
                        <div className="text-xs text-green-600 font-semibold">{formatCurrency(data.revenue || 0)}</div>
                      </div>
                    </div>
                    <div className="w-full bg-[#eec09a]/20 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          category === 'vip' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                          category === 'romantic offer' ? 'bg-gradient-to-r from-pink-400 to-pink-500' :
                          'bg-gradient-to-r from-green-400 to-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-8 text-[#b94c2a]/50">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No category statistics available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;