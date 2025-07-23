import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], subtotal = 0, shipping = 0, total = 0 } = location.state || {};
  
  // Define all state hooks at the top level - before any conditional returns
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod' // Default to Cash on Delivery
  });

  // Use useEffect for navigation logic
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);
  
  // If no cart items, return null but AFTER all hooks are called
  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      // Create order object
      const orderData = {
        items: cartItems,
        totalAmount: total,
        paymentMethod: formData.paymentMethod,
        deliveryAddress: {
          name: formData.name,
          phone: formData.phone,
          addressLine1: formData.addressLine1,
          addressLine2: formData.addressLine2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        clearCart: true
      };

      // If payment method requires additional handling
      if (formData.paymentMethod === 'razorpay') {
        // Here you would integrate with Razorpay
        // For now we'll just simulate it
        alert('Razorpay integration would go here');
        // This would include opening Razorpay modal
      }

      // Send order to backend
      const response = await fetch('http://localhost:5000/api/order', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to place order');
      }

      // Handle successful order
      navigate('/order-success', { 
        state: { 
          orderId: result.data._id,
          orderTotal: total
        } 
      });
    } catch (err) {
      console.error('Order placement failed:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button onClick={() => navigate('/cart')} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>
        <h1>Checkout</h1>
      </div>

      {error && (
        <div className="error-message">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="checkout-content">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h2>Delivery Address</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Street address, house number"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="form-control"
                placeholder="Apartment, suite, building, floor, etc."
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="City"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="form-control"
                >
                  <option value="">Select State</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="pincode">PIN Code</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="6-digit PIN code"
                />
              </div>
            </div>
            
            <h2>Payment Method</h2>
            
            <div className="payment-options">
              <div className="payment-option">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <label htmlFor="cod">
                  <div className="payment-icon cod-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M12 12h6" />
                      <path d="M12 16h6" />
                      <path d="M7 8h.01" />
                    </svg>
                  </div>
                  <div className="payment-label">
                    <span>Cash on Delivery</span>
                    <small>Pay when you receive your order</small>
                  </div>
                </label>
              </div>
              
              <div className="payment-option">
                <input
                  type="radio"
                  id="razorpay"
                  name="paymentMethod"
                  value="razorpay"
                  checked={formData.paymentMethod === 'razorpay'}
                  onChange={handleChange}
                />
                <label htmlFor="razorpay">
                  <div className="payment-icon razorpay-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </div>
                  <div className="payment-label">
                    <span>Credit/Debit Card/UPI</span>
                    <small>Secure online payment</small>
                  </div>
                </label>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="place-order-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <div className="summary-card">
            <h3>Order Summary</h3>
            
            <div className="order-items-preview">
              {cartItems.map(item => (
                <div key={item.productId} className="summary-item">
                  <img src={item.image} alt={item.name} className="summary-item-image" />
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-price">
                      {formatPrice(item.price)} × {item.quantity}
                    </p>
                  </div>
                  <p className="summary-item-total">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>
                {shipping === 0 
                  ? <span className="free-shipping">FREE</span>
                  : formatPrice(shipping)
                }
              </span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;