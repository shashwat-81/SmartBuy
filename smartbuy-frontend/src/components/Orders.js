import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

// Add this line to set the default base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5000';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [currentTracking, setCurrentTracking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Use the correct endpoint that matches your server.js configuration
        const response = await axios.get('/api/order', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data.success) {
          setOrders(response.data.data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#10B981';
      case 'in transit': return '#F59E0B';
      case 'processing': return '#3B82F6';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleTrackOrder = (order) => {
    // Get tracking information (in a real app, you might fetch this from backend)
    const trackingInfo = {
      orderId: order._id,
      status: order.status,
      estimatedDelivery: new Date(Date.now() + 3*24*60*60*1000).toLocaleDateString(),
      trackingId: order.trackingInfo || `TRK${order._id.substring(0, 6)}`,
      steps: [
        {
          title: 'Order Placed',
          description: `Your order was placed on ${formatDate(order.orderDate || order.createdAt)}`,
          completed: true,
          date: order.orderDate || order.createdAt
        },
        {
          title: 'Processing',
          description: 'Your order is being processed',
          completed: ['processing', 'shipped', 'delivered'].includes(order.status.toLowerCase()),
          date: new Date(new Date(order.orderDate || order.createdAt).getTime() + 24*60*60*1000)
        },
        {
          title: 'Shipped',
          description: 'Your order has been shipped',
          completed: ['shipped', 'delivered'].includes(order.status.toLowerCase()),
          date: new Date(new Date(order.orderDate || order.createdAt).getTime() + 2*24*60*60*1000)
        },
        {
          title: 'Out for Delivery',
          description: 'Your order is out for delivery',
          completed: ['delivered'].includes(order.status.toLowerCase()),
          date: new Date(new Date(order.orderDate || order.createdAt).getTime() + 4*24*60*60*1000)
        },
        {
          title: 'Delivered',
          description: 'Your order has been delivered',
          completed: ['delivered'].includes(order.status.toLowerCase()),
          date: new Date(new Date(order.orderDate || order.createdAt).getTime() + 5*24*60*60*1000)
        }
      ]
    };
    
    setCurrentTracking(trackingInfo);
    setTrackingModalOpen(true);
  };

  const closeTrackingModal = () => {
    setTrackingModalOpen(false);
    setTimeout(() => setCurrentTracking(null), 300);
  };

  // Add this function to handle viewing details
  const handleViewDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="orders-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1>My Orders</h1>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      {/* Header */}
      <div className="orders-header">
        <button onClick={() => navigate('/dashboard')} className="back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1>My Orders</h1>
      </div>

      {/* Orders List */}
      {error && (
        <div className="error-message">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="no-orders">
          <div className="no-orders-content">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3>No orders yet</h3>
            <p>Start shopping to see your orders here</p>
            <button 
              className="shop-now-btn"
              onClick={() => navigate('/products')}
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id}</h3>
                  <p className="order-date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    Placed on {formatDate(order.orderDate || order.createdAt)}
                  </p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(order.status), color: 'white' }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} className="item-image" />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p className="item-price">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: {formatPrice(order.totalAmount)}</strong>
                </div>
                <div className="order-actions">
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button 
                      className="track-btn"
                      onClick={() => handleTrackOrder(order)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 17l6-6-6-6"></path>
                      </svg>
                      Track Order
                    </button>
                  )}
                  <button 
                    className="details-btn"
                    onClick={() => handleViewDetails(order._id)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModalOpen && currentTracking && (
        <div className="modal-overlay" onClick={closeTrackingModal}>
          <div className="tracking-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeTrackingModal}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2>Order Tracking</h2>
            <div className="tracking-header">
              <div className="tracking-info">
                <p><strong>Order ID:</strong> {currentTracking.orderId}</p>
                <p><strong>Tracking Number:</strong> {currentTracking.trackingId}</p>
              </div>
              <div className="delivery-info">
                <p><strong>Status:</strong> <span className="status">{currentTracking.status}</span></p>
                <p><strong>Estimated Delivery:</strong> {currentTracking.estimatedDelivery}</p>
              </div>
            </div>
            
            <div className="tracking-timeline">
              {currentTracking.steps.map((step, index) => (
                <div key={index} className={`timeline-step ${step.completed ? 'completed' : ''}`}>
                  <div className="timeline-indicator">
                    {step.completed ? (
                      <svg width="24" height="24" fill="none" stroke="#10B981" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="indicator-dot"></span>
                    )}
                    {index < currentTracking.steps.length - 1 && <span className="timeline-line"></span>}
                  </div>
                  <div className="timeline-content">
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                    {step.date && step.completed && (
                      <p className="step-date">{formatDate(step.date)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
