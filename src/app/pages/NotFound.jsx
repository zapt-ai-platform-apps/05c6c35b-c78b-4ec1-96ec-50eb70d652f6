import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-4xl font-bold mb-4 font-serif">404</h1>
      <h2 className="text-2xl font-bold mb-4 font-serif">Page Not Found</h2>
      <p className="mb-8 text-gray-700">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="bg-brand-green text-white px-6 py-2 rounded hover:bg-green-900 transition-colors cursor-pointer"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;