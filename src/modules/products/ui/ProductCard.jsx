import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card h-full flex flex-col">
      <img src="https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw2fHxnb3VybWV0JTIwZm9vZCUyMGRpc3BsYXklMjB3aXRoJTIwYXJ0aXNhbmFsJTIwY2hlZXNlcyUyQyUyMHdpbmUlMkMlMjBhbmQlMjBvbGl2ZXN8ZW58MHx8fHwxNzQ0MzA4OTk5fDA&ixlib=rb-4.0.3&q=80&w=1080" 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
        data-image-request={product.imageRequest}
      />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;