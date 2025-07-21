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
      title: "Summer Electronics Sale",
      subtitle: "Up to 70% OFF",
      description: "Latest smartphones, laptops & headphones at unbeatable prices!",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Electronics",
      color: "#FF6B35"
    },
    {
      id: 2,
      title: "Fashion Week Special",
      subtitle: "Buy 2 Get 1 FREE",
      description: "Trendy clothing, shoes & accessories from top brands",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Fashion",
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "Home Makeover Sale",
      subtitle: "Flat 50% OFF",
      description: "Transform your space with furniture, decor & appliances",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Home",
      color: "#45B7D1"
    },
    {
      id: 4,
      title: "Fitness Revolution",
      subtitle: "Starting at ₹499",
      description: "Premium gym equipment, sportswear & fitness accessories",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop&crop=center",
      buttonText: "Get Fit Now",
      color: "#96CEB4"
    },
    {
      id: 5,
      title: "Beauty & Wellness Fair",
      subtitle: "Up to 60% OFF",
      description: "Premium skincare, makeup & wellness products",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=400&fit=crop&crop=center",
      buttonText: "Shop Beauty",
      color: "#FECA57"
    },
    {
      id: 6,
      title: "Mega Book Sale",
      subtitle: "3 Books for ₹999",
      description: "Bestsellers, educational books & digital content",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center",
      buttonText: "Read More",
      color: "#A8E6CF"
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
      description: 'Latest smartphones, laptops, and gadgets',
      image: 'https://images.unsplash.com/photo-1498049860654-af1a5c566876?w=400&h=300&fit=crop&crop=center',
      items: 2847,
      trending: true
    },
    {
      id: 2,
      name: 'Fashion & Clothing',
      description: 'Trendy apparel, shoes, and accessories',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop&crop=center',
      items: 4521,
      trending: true
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      description: 'Furniture, appliances, and home decor',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&crop=center',
      items: 3298,
      trending: false
    },
    {
      id: 4,
      name: 'Sports & Fitness',
      description: 'Gym equipment, sportswear, and outdoor gear',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop&crop=center',
      items: 1876,
      trending: true
    },
    {
      id: 5,
      name: 'Books & Education',
      description: 'Books, courses, and learning materials',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
      items: 5643,
      trending: false
    },
    {
      id: 6,
      name: 'Beauty & Personal Care',
      description: 'Skincare, makeup, and wellness products',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop&crop=center',
      items: 2134,
      trending: true
    },
    {
      id: 7,
      name: 'Automotive',
      description: 'Car accessories, parts, and maintenance',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop&crop=center',
      items: 987,
      trending: false
    },
    {
      id: 8,
      name: 'Toys & Games',
      description: 'Educational toys, games, and entertainment',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop&crop=center',
      items: 1456,
      trending: true
    },
    {
      id: 9,
      name: 'Health & Wellness',
      description: 'Supplements, medical devices, and health products',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center',
      items: 892,
      trending: true
    },
    {
      id: 10,
      name: 'Pet Supplies',
      description: 'Food, toys, and accessories for your pets',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=center',
      items: 734,
      trending: false
    },
    {
      id: 11,
      name: 'Office & Stationery',
      description: 'Office supplies, furniture, and stationery',
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=300&fit=crop&crop=center',
      items: 1243,
      trending: false
    },
    {
      id: 12,
      name: 'Food & Groceries',
      description: 'Fresh produce, snacks, and gourmet foods',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop&crop=center',
      items: 6789,
      trending: true
    },
    {
      id: 13,
      name: 'Music & Instruments',
      description: 'Musical instruments, audio equipment, and accessories',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      items: 567,
      trending: false
    },
    {
      id: 14,
      name: 'Travel & Luggage',
      description: 'Suitcases, backpacks, and travel accessories',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&crop=center',
      items: 445,
      trending: true
    },
    {
      id: 15,
      name: 'Garden & Outdoor',
      description: 'Plants, tools, and outdoor furniture',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop&crop=center',
      items: 1123,
      trending: false
    },
    {
      id: 16,
      name: 'Baby & Kids',
      description: 'Baby care, children clothing, and kids furniture',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop&crop=center',
      items: 2156,
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
            <span className="btn-text">Back to Dashboard</span>
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
