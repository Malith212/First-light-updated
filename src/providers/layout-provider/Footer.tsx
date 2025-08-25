import React from "react";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl border-t border-purple-900/30 relative z-10">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 w-full"></div>
      
      <div className="px-5 lg:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="flex flex-col">
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                First Light Villas
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              Luxury villas for unforgettable experiences. Book your perfect getaway today.
            </p>
            <div className="flex items-center text-gray-400">
              Made by First Light Team
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-lg border-l-4 border-purple-600 pl-2">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3">
              {['Home', 'Villas', 'About', 'Contact'].map((item, index) => (
                <span 
                  key={index} 
                  className="text-gray-300 hover:text-purple-400 transition-colors duration-300 cursor-pointer flex items-center"
                >
                  <span className="w-1 h-1 bg-purple-600 rounded-full mr-2"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
            <h3 className="text-white font-semibold mb-4 text-lg border-l-4 border-blue-500 pl-2">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <MapPin size={16} className="text-purple-400" />
                </div>
                <span>123 Luxury Lane, Resort City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-blue-900/30 rounded-lg">
                  <Phone size={16} className="text-blue-400" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <Mail size={16} className="text-purple-400" />
                </div>
                <span>info@firstlightvillas.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} First Light Villas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;