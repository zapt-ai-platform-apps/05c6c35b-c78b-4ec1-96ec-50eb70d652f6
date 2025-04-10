import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4 font-serif">Order Successfully Placed!</h1>
        
        <p className="mb-6 text-gray-700">
          Thank you for your purchase. We've received your order and will begin processing it right away.
          You'll receive an email confirmation shortly.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/products" 
            className="block bg-brand-green text-white px-6 py-2 rounded hover:bg-green-900 transition-colors cursor-pointer"
          >
            Continue Shopping
          </Link>
          
          <Link 
            to="/" 
            className="block text-brand-green hover:underline"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;