import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { 
  Home, 
  Plane, 
  Calendar, 
  Menu, 
  X, 
  Settings,
  ChevronRight,
  LogOutIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    Cookies.remove("jwt", { path: "/" });
    window.location.href = '/login';
  };

  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      path: '/admin',
      description: 'Overview & Analytics' 
    },
    { 
      id: 'flights', 
      label: 'Flights', 
      icon: Plane, 
      path: '/admin/flights',
      description: 'Manage Flight Experiences' 
    },
    { 
      id: 'reservations', 
      label: 'Reservations', 
      icon: Calendar, 
      path: '/admin/reservations',
      description: 'Booking Management' 
    },
  ];

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-[#eec09a] via-[#eec09a] to-[#e8b184] transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-all duration-300 ease-in-out lg:translate-x-0 shadow-2xl flex flex-col h-screen`}>
      {/* Logo Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#b94c2a]/10 to-transparent"></div>
        <div className="relative flex items-center justify-between h-20 px-6 border-b border-[#b94c2a]/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#b94c2a] rounded-xl flex items-center justify-center shadow-lg">
              <Plane className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#b94c2a] tracking-tight">Sky Experience</h1>
              <p className="text-xs text-[#b94c2a]/60 font-medium">Marrakech Adventures</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#b94c2a] hover:bg-[#b94c2a]/10 p-2 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 px-4 space-y-2 flex-grow overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`group relative w-full flex items-center px-4 py-4 rounded-2xl transition-all duration-200 ${
                isActive 
                  ? 'bg-[#b94c2a] text-white shadow-xl transform scale-[1.02]' 
                  : 'text-[#b94c2a] hover:bg-[#b94c2a]/10 hover:transform hover:scale-[1.01]'
              }`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors ${
                isActive ? 'bg-white/20' : 'bg-[#b94c2a]/10 group-hover:bg-[#b94c2a]/15'
              }`}>
                <Icon size={22} className={isActive ? 'text-white' : 'text-[#b94c2a]'} />
              </div>
              <div className="ml-4 flex-1 text-left">
                <div className={`font-semibold text-base ${isActive ? 'text-white' : 'text-[#b94c2a]'}`}>
                  {item.label}
                </div>
                <div className={`text-sm mt-0.5 ${isActive ? 'text-white/80' : 'text-[#b94c2a]/60'}`}>
                  {item.description}
                </div>
              </div>
              {isActive && (
                <ChevronRight size={18} className="text-white/80" />
              )}
            </button>
          );
        })}
      </nav>


      <button onClick={handleLogout} className="flex-shrink-0 px-4 py-6">
        <div className="bg-[#b94c2a]/10 hover:bg-[#b94c2a]/20 transition-colors duration-300 backdrop-blur-sm rounded-2xl p-4 border border-[#b94c2a]/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#b94c2a] rounded-xl flex items-center justify-center">
              <LogOutIcon className="text-white" size={20} />
            </div>
            <div>
              <p className="text-[#b94c2a] font-semibold">Logout</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );

  const Header = () => (
    <header className="bg-white/80 backdrop-blur-xl border-b border-[#eec09a]/30 sticky top-0 z-40">
      <div className="flex items-center justify-between h-20 px-8">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#b94c2a] hover:bg-[#eec09a]/20 p-3 rounded-xl transition-colors"
          >
            <Menu size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#b94c2a] capitalize tracking-tight">
              {menuItems.find(item => item.path === currentPath)?.label || 'Dashboard'}
            </h2>
            <p className="text-[#b94c2a]/60 text-sm font-medium mt-1">
              {menuItems.find(item => item.path === currentPath)?.description || 'Welcome back to your dashboard'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          
          {/* Profile */}
          <div className="flex items-center space-x-3 bg-[#eec09a]/20 rounded-xl px-4 py-3">
            <div className="w-10 h-10 bg-[#b94c2a] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            <div className="hidden md:block">
              <p className="text-[#b94c2a] font-semibold text-sm">Admin User</p>
              <p className="text-[#b94c2a]/60 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-[#eec09a]/10">
      <Sidebar />
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col lg:ml-80 min-h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;