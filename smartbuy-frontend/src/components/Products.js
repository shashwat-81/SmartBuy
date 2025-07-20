import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 134900,
      image: 'https://via.placeholder.com/300x300/2874f0/ffffff?text=iPhone+15+Pro',
      category: 'Electronics',
      rating: 4.8,
      reviews: 1234,
      originalPrice: 149900,
      discount: 10
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      price: 12995,
      image: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=Nike+Air+Max',
      category: 'Fashion',
      rating: 4.5,
      reviews: 856,
      originalPrice: 14995,
      discount: 13
    },
    {
      id: 3,
      name: 'MacBook Pro 14"',
      price: 199900,
      image: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=MacBook+Pro',
      category: 'Electronics',
      rating: 4.9,
      reviews: 2341,
      originalPrice: 224900,
      discount: 11
    },
    {
      id: 4,
      name: 'Sony WH-1000XM4',
      price: 29990,
      image: 'https://via.placeholder.com/300x300/27ae60/ffffff?text=Sony+Headphones',
      category: 'Electronics',
      rating: 4.7,
      reviews: 1876,
      originalPrice: 34990,
      discount: 14
    },
    {
      id: 5,
      name: 'Adidas Ultraboost 22',
      price: 17999,
      image: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=Adidas+Shoes',
      category: 'Fashion',
      rating: 4.6,
      reviews: 743,
      originalPrice: 19999,
      discount: 10
    },
    {
      id: 6,
      name: 'Samsung Galaxy S24',
      price: 74999,
      image: 'https://via.placeholder.com/300x300/3498db/ffffff?text=Galaxy+S24',
      category: 'Electronics',
      rating: 4.4,
      reviews: 1092,
      originalPrice: 79999,
      discount: 6
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ['All', 'Electronics', 'Fashion'];

  // Fetch wishlist and cart data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch wishlist
        const wishlistResponse = await fetch('http://localhost:5000/api/shop/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (wishlistResponse.ok) {
          const wishlistData = await wishlistResponse.json();
          setWishlistItems(wishlistData.data.items);
        }

        // Fetch cart
        const cartResponse = await fetch('http://localhost:5000/api/shop/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          setCartItems(cartData.data.items);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Check for category parameter in URL
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/shop/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Update cart state
        const updatedCart = [...cartItems];
        const existingItem = updatedCart.find(item => item.productId === product.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedCart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
          });
        }
        setCartItems(updatedCart);
        alert('Product added to cart successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleToggleWishlist = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to manage wishlist');
      return;
    }

    const isInWishlist = wishlistItems.some(item => item.productId === product.id);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch(`http://localhost:5000/api/shop/wishlist/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setWishlistItems(wishlistItems.filter(item => item.productId !== product.id));
          alert('Product removed from wishlist!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const response = await fetch('http://localhost:5000/api/shop/wishlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          })
        });

        if (response.ok) {
          const newWishlistItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          };
          setWishlistItems([...wishlistItems, newWishlistItem]);
          alert('Product added to wishlist!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  return (
    <div className="products-container">
      {/* Navigation Header */}
      <nav className="products-nav">
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
            <h1>SmartBuy Products</h1>
          </div>
        </div>
      </nav>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-content">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.discount > 0 && (
                <div className="discount-badge">{product.discount}% OFF</div>
              )}
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-category">{product.category}</div>
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                  <span className="rating-text">({product.rating}) · {product.reviews} reviews</span>
                </div>
              </div>
              <div className="product-pricing">
                <div className="current-price">{formatPrice(product.price)}</div>
                {product.originalPrice > product.price && (
                  <div className="original-price">{formatPrice(product.originalPrice)}</div>
                )}
              </div>
              <div className="product-actions">
                <button 
                  className="btn-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button 
                  className={`btn-wishlist ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                  onClick={() => handleToggleWishlist(product)}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg width="20" height="20" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-content">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
