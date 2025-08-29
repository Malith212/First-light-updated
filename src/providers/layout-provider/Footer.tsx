import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-2xl border-t border-purple-900/30 relative z-10">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-500 w-full"></div>

      <div className="px-5 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          {/* Brand Section */}
          <div className="flex flex-col max-w-sm">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
                First Light Villas
              </span>
            </h2>
            <p className="text-gray-300 mb-6">
              Luxury villas for unforgettable experiences. Book your perfect getaway today.
            </p>
            <span className="text-gray-400">Made by First Light Team</span>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col md:items-end">
            <h3 className="text-white font-semibold mb-6 text-lg border-l-4 border-blue-500 pl-2 md:pl-0 md:border-l-0 md:border-r-4 md:border-blue-500">
              Contact Us
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-300 justify-start md:justify-end">
                <MapPin size={20} className="text-purple-400" />
                <span>123 Luxury Lane, Resort City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 justify-start md:justify-end">
                <Phone size={20} className="text-blue-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 justify-start md:justify-end">
                <Mail size={20} className="text-purple-400" />
                <span>info@firstlightvillas.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} First Light Villas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
