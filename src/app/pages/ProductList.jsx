import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../../modules/products/data';
import ProductCard from '../../modules/products/ui/ProductCard';

const ProductList = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState(categoryParam || 'all');
  const [sortOption, setSortOption] = useState('featured');
  
  useEffect(() => {
    if (categoryParam && categoryParam !== 'all') {
      setActiveCategory(categoryParam);
      setFilteredProducts(products.filter(product => product.category === categoryParam));
    } else {
      setActiveCategory('all');
      setFilteredProducts(products);
    }
  }, [categoryParam]);
  
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === categoryId));
    }
  };
  
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    
    let sorted = [...filteredProducts];
    
    switch (option) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
        sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 font-serif">Our Gourmet Selection</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Category Filters */}
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="font-bold text-xl mb-4 font-serif">Categories</h2>
            
            <ul className="space-y-2">
              <li>
                <button 
                  className={`w-full text-left px-2 py-1 rounded cursor-pointer transition-colors ${activeCategory === 'all' ? 'bg-brand-green text-white' : 'hover:bg-gray-100'}`}
                  onClick={() => handleCategoryChange('all')}
                >
                  All Products
                </button>
              </li>
              
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className={`w-full text-left px-2 py-1 rounded cursor-pointer transition-colors ${activeCategory === category.id ? 'bg-brand-green text-white' : 'hover:bg-gray-100'}`}
                    onClick={() => handleCategoryChange(category.id)}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">Showing {filteredProducts.length} products</p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-600">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption} 
                onChange={handleSortChange}
                className="border rounded p-1 box-border"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
              </select>
            </div>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-center shadow">
              <p>No products found in this category. Please try another category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;