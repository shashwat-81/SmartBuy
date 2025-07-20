import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/shop/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          setWishlistItems(result.data.items || []);
        } else {
          const error = await response.json();
          setError(error.message || 'Failed to load wishlist');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
        setError('Failed to load wishlist');
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRemoveFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/shop/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      alert('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (item) => {
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
          productId: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: 1
        })
      });

      if (response.ok) {
        alert('Product added to cart successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return (
      <div className="wishlist-container">
        <div className="wishlist-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1>My Wishlist</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      {/* Header */}
      <div className="wishlist-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1>My Wishlist</h1>
        {wishlistItems.length > 0 && (
          <span className="item-count">{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Wishlist Content */}
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-content">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3>Your wishlist is empty</h3>
            <p>Save items you love for later</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(item => (
            <div key={item.productId} className="wishlist-item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="item-image" />
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveFromWishlist(item.productId)}
                  title="Remove from wishlist"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-category">{item.category}</div>
                <div className="item-price">{formatPrice(item.price)}</div>
                
                <div className="item-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
