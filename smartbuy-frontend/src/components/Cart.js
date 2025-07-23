import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/shop/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          setCartItems(result.data.items || []);
        } else {
          const error = await response.json();
          setError(error.message || 'Failed to load cart');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/shop/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.ok) {
        setCartItems(prev => 
          prev.map(item => 
            item.productId === productId 
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/shop/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove from cart');
    }
  };

  const handleAddToWishlist = async (item) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/shop/wishlist', {
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
          category: item.category
        })
      });

      if (response.ok) {
        alert('Product added to wishlist!');
        // Optionally remove from cart after adding to wishlist
        // handleRemoveFromCart(item.productId);
      } else {
        const error = await response.json();
        if (error.message.includes('already in wishlist')) {
          alert('Product is already in your wishlist!');
        } else {
          alert(error.message || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Failed to add to wishlist');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    return subtotal + shipping;
  };

  const handleProceedToCheckout = () => {
    // In a real app, you would navigate to checkout page
    alert('Checkout functionality would be implemented here!');
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 style={{ textAlign: 'center' }}>Shopping Cart</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1>Shopping Cart</h1>
        {cartItems.length > 0 && (
          <span className="item-count">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
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

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-content">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.productId} className="cart-item">
                <div className="item-image-container">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-category">{item.category}</div>
                  <div className="item-price">{formatPrice(item.price)}</div>
                  
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-actions">
                      <button 
                        className="wishlist-btn"
                        onClick={() => handleAddToWishlist(item)}
                        title="Move to wishlist"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemoveFromCart(item.productId)}
                        title="Remove from cart"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="item-total">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>{formatPrice(calculateSubtotal())}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {calculateSubtotal() > 500 
                    ? <span className="free-shipping">FREE</span>
                    : formatPrice(50)
                  }
                </span>
              </div>
              
              {calculateSubtotal() <= 500 && (
                <div className="shipping-note">
                  Add {formatPrice(500 - calculateSubtotal())} more for free shipping
                </div>
              )}
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
              
              <button 
                className="continue-shopping-btn"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
