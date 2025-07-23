import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, orderTotal } = location.state || {};

  // If no order data is passed, redirect to dashboard
  if (!orderId) {
    navigate('/dashboard');
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="order-success-container">
      <div className="success-card">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        
        <h1>Order Placed Successfully!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="order-details">
          <div className="detail-row">
            <span>Order ID:</span>
            <span>{orderId}</span>
          </div>
          <div className="detail-row">
            <span>Total Amount:</span>
            <span>{orderTotal ? formatPrice(orderTotal) : 'N/A'}</span>
          </div>
        </div>
        
        <p className="instruction-text">
          You will receive an email confirmation shortly with the details of your order.
        </p>
        
        <div className="success-buttons">
          <button 
            onClick={() => navigate('/orders')} 
            className="primary-btn"
          >
            View My Orders
          </button>
          <button 
            onClick={() => navigate('/products')} 
            className="secondary-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;