import React from 'react';
import { Link } from 'react-router-dom';
import { products, categories } from '../../modules/products/data';
import ProductCard from '../../modules/products/ui/ProductCard';

const Home = () => {
  // Get featured products
  const featuredProducts = products.filter(product => product.featured);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-12">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold mb-4 font-serif">Discover Gourmet Excellence</h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Explore our curated selection of the finest gourmet foods from around the world.
              From rare truffles to aged balsamic vinegar, we bring the extraordinary to your table.
            </p>
            <Link 
              to="/products"
              className="bg-brand-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-900 transition-colors cursor-pointer inline-block"
            >
              Shop Now
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxMHx8Z291cm1ldCUyMGZvb2QlMjBkaXNwbGF5JTIwd2l0aCUyMGFydGlzYW5hbCUyMGNoZWVzZXMlMkMlMjB3aW5lJTJDJTIwYW5kJTIwb2xpdmVzfGVufDB8fHx8MTc0NDMwODk5OXww&ixlib=rb-4.0.3&q=80&w=1080" 
               
              alt="Gourmet food display with artisanal cheeses, wine, and olives" 
              className="rounded-lg shadow-md"
              data-image-request="gourmet food display with artisanal cheeses, wine, and olives"
            />
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="section-heading">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/products"
            className="bg-brand-gold text-white px-6 py-2 rounded hover:bg-amber-600 transition-colors cursor-pointer"
          >
            View All Products
          </Link>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="section-heading">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2 font-serif">{category.name}</h3>
              <p className="text-gray-700">
                Explore our {category.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;