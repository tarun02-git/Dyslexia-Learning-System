import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
              <span className="font-bold text-xl">DysLearn</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Empowering individuals with dyslexia through personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Learn</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/library" className="text-gray-400 hover:text-white transition-colors">
                  Content Library
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  Learning Tools
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  TTS & STT Features
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-white transition-colors">
                  Games & Exercises
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DysLearn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;