import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://via.placeholder.com/400x300/2874f0/ffffff?text=Electronics',
      items: 1247,
      trending: true
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://via.placeholder.com/400x300/e91e63/ffffff?text=Fashion',
      items: 2834,
      trending: true
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      image: 'https://via.placeholder.com/400x300/4caf50/ffffff?text=Home+%26+Garden',
      items: 1892,
      trending: false
    },
    {
      id: 4,
      name: 'Sports',
      description: 'Sports equipment and fitness gear',
      image: 'https://via.placeholder.com/400x300/ff9800/ffffff?text=Sports',
      items: 756,
      trending: true
    },
    {
      id: 5,
      name: 'Books',
      description: 'Books, e-books, and educational materials',
      image: 'https://via.placeholder.com/400x300/795548/ffffff?text=Books',
      items: 3421,
      trending: false
    },
    {
      id: 6,
      name: 'Beauty',
      description: 'Cosmetics and personal care products',
      image: 'https://via.placeholder.com/400x300/e91e63/ffffff?text=Beauty',
      items: 1634,
      trending: true
    },
    {
      id: 7,
      name: 'Automotive',
      description: 'Car accessories and automotive parts',
      image: 'https://via.placeholder.com/400x300/607d8b/ffffff?text=Automotive',
      items: 543,
      trending: false
    },
    {
      id: 8,
      name: 'Toys & Games',
      description: 'Fun toys and games for all ages',
      image: 'https://via.placeholder.com/400x300/9c27b0/ffffff?text=Toys+%26+Games',
      items: 987,
      trending: true
    }
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page with category filter
    navigate(`/products?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="categories-container">
      {/* Navigation Header */}
      <nav className="categories-nav">
        <div className="nav-content">
          <button
            onClick={() => navigate('/dashboard')}
            className="back-btn"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <div className="nav-logo">
            <h1>Explore Categories</h1>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="categories-hero">
        <div className="hero-content">
          <h2>Discover Amazing Products</h2>
          <p>Browse through our carefully curated categories to find exactly what you're looking for</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-grid">
        {categories.map(category => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.trending && (
              <div className="trending-badge">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Trending
              </div>
            )}
            <div className="category-image-container">
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-overlay">
                <div className="category-info">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-items">
                    {category.items.toLocaleString()} items
                  </div>
                </div>
                <div className="category-action">
                  <button className="explore-btn">
                    Explore
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <div className="quick-actions-content">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button 
              className="action-btn"
              onClick={() => navigate('/products')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View All Products
            </button>
            <button 
              className="action-btn"
              onClick={() => navigate('/dashboard')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 15v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
              </svg>
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
