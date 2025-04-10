import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../modules/products/data';
import { useCartStore } from '../../modules/cart/internal/state';
import { eventBus, events } from '../../modules/core/events';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addItem);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    if (foundProduct) {
      setProduct(foundProduct);
      eventBus.publish(events.PRODUCT_VIEWED, { productId: foundProduct.id });
    }
    
    setLoading(false);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product && !isSubmitting) {
      setIsSubmitting(true);
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset added to cart status after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
        setIsSubmitting(false);
      }, 2000);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 font-serif">Product Not Found</h2>
        <p className="mb-6 text-gray-700">We couldn't find the product you're looking for.</p>
        <button 
          onClick={() => navigate('/products')}
          className="bg-brand-green text-white px-6 py-2 rounded hover:bg-green-900 transition-colors cursor-pointer"
        >
          Back to Shop
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="md:flex -mx-6">
        <div className="md:w-1/2 px-6 mb-8 md:mb-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
            data-image-request={product.imageRequest}
          />
        </div>
        
        <div className="md:w-1/2 px-6">
          <div className="pb-2 mb-4 border-b border-gray-200">
            <h1 className="text-3xl font-bold mb-2 font-serif">{product.name}</h1>
            <div className="text-2xl font-bold text-brand-green">
              ${product.price.toFixed(2)}
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Quantity:</label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l text-gray-700 hover:bg-gray-300 cursor-pointer transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b border-gray-200 py-1 box-border"
                aria-label="Product quantity"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r text-gray-700 hover:bg-gray-300 cursor-pointer transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 
                ? `${product.stock} in stock` 
                : 'Out of stock'}
            </p>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isSubmitting}
            className={`w-full py-3 px-6 rounded-lg font-bold transition-colors cursor-pointer ${
              product.stock === 0 
                ? 'bg-gray-300 cursor-not-allowed' 
                : addedToCart 
                  ? 'bg-green-600 text-white' 
                  : 'bg-brand-green text-white hover:bg-green-900'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding to Cart...
              </span>
            ) : addedToCart ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;