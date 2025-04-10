import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card h-full flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
        data-image-request={product.imageRequest}
      />
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2 flex-grow">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-brand-green">
            ${product.price.toFixed(2)}
          </span>
          <Link 
            to={`/product/${product.id}`}
            className="text-sm bg-brand-green text-white px-3 py-1 rounded hover:bg-green-900 transition-colors cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;