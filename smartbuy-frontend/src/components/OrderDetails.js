import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OrderDetails.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`/api/order/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setOrder(response.data.data);
        } else {
          throw new Error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return "N/A";
      }
      
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return '#10B981';
      case 'shipped': return '#F59E0B';
      case 'processing': return '#3B82F6';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="order-details-container">
        <div className="order-details-header">
          <button onClick={() => navigate('/orders')} className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
          <h1>Order Details</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-details-container">
        <div className="order-details-header">
          <button onClick={() => navigate('/orders')} className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
          <h1>Order Details</h1>
        </div>
        <div className="error-message">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-container">
      <div className="order-details-header">
        <button onClick={() => navigate('/orders')} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </button>
        <h1>Order Details</h1>
      </div>

      <div className="order-details-content">
        <div className="order-summary-card">
          <div className="order-summary-header">
            <div>
              <h2>Order #{order?._id}</h2>
              <p className="order-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Placed on {formatDate(order?.orderDate || order?.createdAt)}
              </p>
            </div>
            <div className="order-status-badge" style={{ backgroundColor: getStatusColor(order?.status) }}>
              {order?.status}
            </div>
          </div>

          <div className="order-info-grid">
            <div className="order-info-section">
              <h3>Shipping Address</h3>
              <div className="address-details">
                <p><strong>{order?.deliveryAddress?.name}</strong></p>
                <p>{order?.deliveryAddress?.addressLine1}</p>
                {order?.deliveryAddress?.addressLine2 && <p>{order?.deliveryAddress?.addressLine2}</p>}
                <p>{order?.deliveryAddress?.city}, {order?.deliveryAddress?.state} {order?.deliveryAddress?.pincode}</p>
                <p>Phone: {order?.deliveryAddress?.phone}</p>
              </div>
            </div>

            <div className="order-info-section">
              <h3>Payment Information</h3>
              <div className="payment-details">
                <p><strong>Payment Method:</strong> {order?.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
                <p><strong>Total Amount:</strong> {formatPrice(order?.totalAmount)}</p>
                {order?.paymentMethod !== 'cod' && (
                  <p className="payment-status success">Payment Successful</p>
                )}
              </div>
            </div>
          </div>

          <div className="order-items-section">
            <h3>Order Items</h3>
            <div className="ordered-items-list">
              {order?.items?.map((item, index) => (
                <div key={index} className="ordered-item">
                  <div className="ordered-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="ordered-item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">{formatPrice(item.price)}</p>
                    <p className="item-qty">Quantity: {item.quantity}</p>
                  </div>
                  <div className="ordered-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-total-section">
            <div className="total-row">
              <span>Subtotal</span>
              <span>{formatPrice(order?.totalAmount - 50)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>₹50</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>{formatPrice(order?.totalAmount)}</span>
            </div>
          </div>
          
          {order?.status !== 'delivered' && order?.status !== 'cancelled' && (
            <div className="order-actions-section">
              <button className="track-order-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 17l6-6-6-6"></path>
                </svg>
                Track Order
              </button>
              <button className="cancel-order-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;