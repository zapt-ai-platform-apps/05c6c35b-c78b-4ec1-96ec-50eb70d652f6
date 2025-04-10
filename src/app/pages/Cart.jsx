import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../modules/cart/internal/state';

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [removingItems, setRemovingItems] = useState({});
  const [updatingItems, setUpdatingItems] = useState({});
  
  const handleRemoveItem = (itemId) => {
    setRemovingItems(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItems(prev => ({ ...prev, [itemId]: false }));
    }, 300);
  };
  
  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      updateQuantity(itemId, newQuantity);
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }, 300);
  };
  
  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 font-serif">Your Cart</h1>
        <p className="mb-8 text-gray-600">Your cart is currently empty.</p>
        <Link 
          to="/products" 
          className="bg-brand-green text-white px-6 py-2 rounded hover:bg-green-900 transition-colors cursor-pointer"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-serif">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="hidden md:flex font-bold border-b pb-4 mb-4 text-gray-700">
          <div className="w-1/2">Product</div>
          <div className="w-1/6 text-center">Price</div>
          <div className="w-1/6 text-center">Quantity</div>
          <div className="w-1/6 text-center">Total</div>
        </div>
        
        {items.map(item => (
          <div key={item.id} className="md:flex items-center border-b py-4">
            <div className="md:w-1/2 flex items-center mb-4 md:mb-0">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 h-20 object-cover rounded mr-4"
                data-image-request={item.imageRequest}
              />
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <button 
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removingItems[item.id]}
                  className="text-red-600 text-sm hover:underline mt-1 cursor-pointer flex items-center"
                >
                  {removingItems[item.id] ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Removing...
                    </>
                  ) : (
                    'Remove'
                  )}
                </button>
              </div>
            </div>
            
            <div className="md:w-1/6 text-center">
              <div className="block md:hidden font-bold mb-1">Price:</div>
              ${item.price.toFixed(2)}
            </div>
            
            <div className="md:w-1/6 text-center">
              <div className="block md:hidden font-bold mb-1">Quantity:</div>
              <div className="flex items-center justify-center">
                <button 
                  onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={updatingItems[item.id]}
                  className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 cursor-pointer transition-colors"
                >
                  -
                </button>
                <input 
                  type="number" 
                  min="1" 
                  value={item.quantity} 
                  onChange={(e) => handleUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                  disabled={updatingItems[item.id]}
                  className="w-12 text-center border-t border-b border-gray-200 py-1 box-border"
                />
                <button 
                  onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={updatingItems[item.id]}
                  className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
              {updatingItems[item.id] && (
                <div className="text-xs text-gray-500 mt-1">Updating...</div>
              )}
            </div>
            
            <div className="md:w-1/6 text-center">
              <div className="block md:hidden font-bold mb-1">Total:</div>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        
        <div className="flex justify-end pt-6">
          <div className="w-full md:w-1/3">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold">${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="font-medium">Shipping:</span>
              <span className="font-bold">Calculated at checkout</span>
            </div>
            <Link 
              to="/checkout" 
              className="block bg-brand-green text-white py-3 px-6 rounded-lg text-center font-bold hover:bg-green-900 transition-colors cursor-pointer"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;