import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../modules/cart/internal/state';
import { eventBus, events } from '../../modules/core/events';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    paymentMethod: 'credit'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send data to an API
      eventBus.publish(events.CHECKOUT_COMPLETED, {
        items: [...items],
        total: getTotal(),
        customer: { ...formData },
        orderDate: new Date().toISOString()
      });
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/checkout/success');
    } catch (error) {
      console.error('Checkout failed:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-serif">Checkout</h1>
      
      <div className="md:flex -mx-4">
        <div className="md:w-2/3 px-4 mb-8 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 font-serif">Shipping Information</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.firstName ? 'border-red-500' : ''}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.lastName ? 'border-red-500' : ''}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.address ? 'border-red-500' : ''}`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.city ? 'border-red-500' : ''}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="state">State/Province</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.state ? 'border-red-500' : ''}`}
                  />
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="zip">ZIP/Postal Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border ${errors.zip ? 'border-red-500' : ''}`}
                  />
                  {errors.zip && <p className="text-red-500 text-sm mt-1">{errors.zip}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2" htmlFor="country">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded focus:border-brand-green focus:outline-none box-border"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-6 font-serif">Payment Method</h2>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="credit"
                    name="paymentMethod"
                    value="credit"
                    checked={formData.paymentMethod === 'credit'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="credit">Credit Card</label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="bg-brand-green text-white py-3 px-6 rounded-lg font-bold hover:bg-green-900 transition-colors cursor-pointer w-full md:w-auto disabled:bg-green-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : 'Complete Order'}
              </button>
            </form>
          </div>
        </div>
        
        <div className="md:w-1/3 px-4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 font-serif">Order Summary</h2>
            
            <div className="border-b pb-4 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>$0.00</span>
            </div>
            
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>Total</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;