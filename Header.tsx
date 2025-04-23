import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, BarChart, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">DysLearn</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {authState.status === 'authenticated' ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/dashboard') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/library" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/library') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Content Library
                </Link>
                <Link 
                  to="/analytics" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/analytics') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Analytics
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/profile') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Profile
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center text-red-600"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/about') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/features') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Features
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {authState.status === 'authenticated' ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/dashboard') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Dashboard
                  </div>
                </Link>
                <Link 
                  to="/library" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/library') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Content Library
                  </div>
                </Link>
                <Link 
                  to="/analytics" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/analytics') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2" />
                    Analytics
                  </div>
                </Link>
                <Link 
                  to="/profile" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/features') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Features
                </Link>
                <Link 
                  to="/login"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 text-center"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;