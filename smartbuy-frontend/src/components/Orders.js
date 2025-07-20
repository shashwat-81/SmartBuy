import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // For now, we'll create mock orders since we don't have an orders backend yet
        // In a real application, you would fetch from your orders API
        const mockOrders = [
          {
            id: 'ORD001',
            date: '2024-01-15',
            status: 'Delivered',
            total: 2999,
            items: [
              {
                id: 1,
                name: 'iPhone 15 Pro',
                price: 2999,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              }
            ]
          },
          {
            id: 'ORD002',
            date: '2024-01-10',
            status: 'In Transit',
            total: 1599,
            items: [
              {
                id: 2,
                name: 'MacBook Air M2',
                price: 1599,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
              }
            ]
          }
        ];

        setOrders(mockOrders);
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
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">Placed on {formatDate(order.date)}</p>
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
                  <strong>Total: {formatPrice(order.total)}</strong>
                </div>
                <div className="order-actions">
                  <button className="track-btn">Track Order</button>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
