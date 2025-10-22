import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, Plane } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData, {withCredentials: true});
      
      if (response.data.success) {

        // Redirect to admin dashboard
        window.location.href = '/admin';
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed');
        console.log(err)
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-[#eec09a]/30 p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-[#b94c2a] rounded-2xl mb-4">
            <Plane className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-[#b94c2a]">Admin Dashboard</h1>
          <p className="text-[#b94c2a]/70">Sign in to access the admin panel</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#b94c2a] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#b94c2a] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full p-3 border border-[#eec09a]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#b94c2a]/30 pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#b94c2a]/50 hover:text-[#b94c2a]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-[#b94c2a] focus:ring-[#b94c2a] border-[#eec09a] rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#b94c2a]">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#b94c2a] text-white py-3 px-4 rounded-xl hover:bg-[#a03d22] transition-colors flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <LogIn size={20} />
                Sign In
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;