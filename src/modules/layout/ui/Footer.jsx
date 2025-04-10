import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-brand-green text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Gourmet Food Delights</h3>
            <p className="text-gray-300">
              Bringing the finest gourmet products from around the world to your table.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: support@gourmetdelights.com<br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Gourmet Food Delights. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
              Made on ZAPT
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;