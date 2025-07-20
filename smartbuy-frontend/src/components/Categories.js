import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';

const Categories = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel data for offers and deals
  const carouselItems = [
    {
      id: 1,
      title: "Summer Mega Sale",
      subtitle: "Up to 70% OFF",
      description: "Don't miss out on the biggest sale of the year!",
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Now",
      color: "#FF6B35"
    },
    {
      id: 2,
      title: "Electronics Bonanza",
      subtitle: "Starting at ₹999",
      description: "Latest smartphones, laptops & gadgets at unbeatable prices",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&crop=center",
      buttonText: "Explore Deals",
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "Fashion Festival",
      subtitle: "Buy 2 Get 1 FREE",
      description: "Trendy outfits for every occasion",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Fashion",
      color: "#45B7D1"
    },
    {
      id: 4,
      title: "Home Essentials",
      subtitle: "Flat 50% OFF",
      description: "Transform your space with our home collection",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=400&fit=crop&crop=center",
      buttonText: "Decorate Now",
      color: "#96CEB4"
    },
    {
      id: 5,
      title: "Flash Sale",
      subtitle: "Limited Time Only",
      description: "24 hours left! Grab your favorites before they're gone",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&crop=center",
      buttonText: "Hurry Up!",
      color: "#FECA57"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Latest gadgets and electronic devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop&crop=center',
      items: 1247,
      trending: true
    },
    {
      id: 2,
      name: 'Fashion',
      description: 'Trendy clothing and accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop&crop=center',
      items: 2834,
      trending: true
    },
    {
      id: 3,
      name: 'Home & Garden',
      description: 'Everything for your home and garden',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center',
      items: 1892,
      trending: false
    },
    {
      id: 4,
      name: 'Sports',
      description: 'Sports equipment and fitness gear',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      items: 756,
      trending: true
    },
    {
      id: 5,
      name: 'Books',
      description: 'Books, e-books, and educational materials',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
      items: 3421,
      trending: false
    },
    {
      id: 6,
      name: 'Beauty',
      description: 'Cosmetics and personal care products',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop&crop=center',
      items: 1634,
      trending: true
    },
    {
      id: 7,
      name: 'Automotive',
      description: 'Car accessories and automotive parts',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop&crop=center',
      items: 543,
      trending: false
    },
    {
      id: 8,
      name: 'Toys & Games',
      description: 'Fun toys and games for all ages',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop&crop=center',
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
        <h2>Discover Amazing Products</h2>
        <p>Browse through our carefully curated categories to find exactly what you're looking for</p>
      </div>

      {/* Offers Carousel */}
      <div className="offers-carousel-container">
        <div className="carousel-wrapper">
          <div className="carousel-header">
            <h2>🔥 Hot Deals & Offers</h2>
            <p>Limited time offers you can't miss!</p>
          </div>
          
          <div className="carousel-container">
            <button className="carousel-btn carousel-prev" onClick={prevSlide}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="carousel-content">
              <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselItems.map((item, index) => (
                  <div key={item.id} className="carousel-slide">
                    <div className="slide-content">
                      <div className="slide-text">
                        <div className="slide-badge" style={{ backgroundColor: item.color }}>
                          Special Offer
                        </div>
                        <h3 className="slide-title">{item.title}</h3>
                        <h4 className="slide-subtitle" style={{ color: item.color }}>{item.subtitle}</h4>
                        <p className="slide-description">{item.description}</p>
                        <button 
                          className="slide-button"
                          style={{ backgroundColor: item.color }}
                          onClick={() => navigate('/products')}
                        >
                          {item.buttonText}
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                      <div className="slide-image">
                        <img src={item.image} alt={item.title} />
                        <div className="image-overlay" style={{ background: `linear-gradient(45deg, ${item.color}20, ${item.color}10)` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button className="carousel-btn carousel-next" onClick={nextSlide}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="carousel-dots">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></button>
            ))}
          </div>
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
