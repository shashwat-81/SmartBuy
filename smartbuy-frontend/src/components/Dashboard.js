import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setProfile(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information');
        // If token is invalid, redirect to login
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Profile button clicked!', e);
    console.log('Navigate function:', navigate);
    try {
      navigate('/profile');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen loading-container flex items-center justify-center">
        <div className="glass-card text-center p-12 fade-in">
          <div className="loading-spinner">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto mb-8"></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 text-gradient">Loading Dashboard</h3>
          <p className="text-gray-600 text-lg shimmer">Preparing your SmartBuy experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-bg dashboard-container">
      {/* Navigation Header */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover-lift">
              <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">SmartBuy</h1>
              {/* <p className="text-xs text-gray-600 -mt-1 shimmer">Your Smart Shopping Companion</p> */}
            </div>
          </div>
          <div className="nav-actions">
            <button 
              type="button"
              onClick={handleProfileClick}
              className="profile-btn flex items-center space-x-2 px-3 py-2 rounded transition-all duration-200 hover:bg-white hover:bg-opacity-10"
              style={{ cursor: 'pointer', zIndex: 10 }}
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="text-white text-sm font-medium">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-logout"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-content">
          {error && (
            <div className="error-card">
              <div className="error-content">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="error-text">{error}</span>
              </div>
            </div>
          )}

          {/* Welcome Hero Section */}
          <div className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <div className="icon-container">
                  <svg className="hero-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h1 className="hero-title">
                  Welcome to <span className="brand-text">SmartBuy</span>
                </h1>
                <p className="hero-description">
                  Your one-stop destination for all your shopping needs. Discover amazing products, great deals, and enjoy a seamless shopping experience.
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => navigate('/products')}>Start Shopping</button>
                  <button className="btn-secondary" onClick={() => navigate('/categories')}>Explore Categories</button>
                </div>
              </div>
              <div className="hero-visual">
                <div className="visual-container">
                  <svg className="visual-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="card-title">Quick Actions</h3>
                <p className="card-subtitle">Access your favorite features instantly</p>
              </div>
            </div>
            <div className="actions-grid">
              <div className="action-card" onClick={() => navigate('/products')} style={{cursor: 'pointer'}}>
                <div className="action-icon shopping">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h4 className="action-title">Shop Now</h4>
                <p className="action-description">Explore our latest products</p>
              </div>
              
              <div className="action-card" onClick={() => navigate('/orders')} style={{cursor: 'pointer'}}>
                <div className="action-icon orders">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="action-title">My Orders</h4>
                <p className="action-description">Track your purchases</p>
              </div>
              
              <div className="action-card" onClick={() => navigate('/wishlist')} style={{cursor: 'pointer'}}>
                <div className="action-icon wishlist">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="action-title">Wishlist</h4>
                <p className="action-description">Saved for later</p>
              </div>
              
              <div className="action-card" onClick={() => navigate('/cart')} style={{cursor: 'pointer'}}>
                <div className="action-icon cart">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                </div>
                <h4 className="action-title">Cart</h4>
                <p className="action-description">Review your items</p>
              </div>
              
              <div className="action-card" onClick={() => navigate('/profile')} style={{cursor: 'pointer'}}>
                <div className="action-icon settings">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="action-title">Settings</h4>
                <p className="action-description">Manage your account</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="cards-grid stats-grid">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <div className="stat-label">Total Orders</div>
                  <div className="stat-value">0</div>
                  <div className="stat-description">Get started by placing your first order!</div>
                </div>
                <div className="stat-icon orders">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <div className="stat-label">Total Spent</div>
                  <div className="stat-value">₹0</div>
                  <div className="stat-description">Start shopping to see your spending!</div>
                </div>
                <div className="stat-icon spending">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-info">
                  <div className="stat-label">Saved Items</div>
                  <div className="stat-value">0</div>
                  <div className="stat-description">Items in your wishlist</div>
                </div>
                <div className="stat-icon wishlist">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="card welcome-card">
            <div className="welcome-content">
              <div className="welcome-icon">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h4 className="welcome-title">Welcome to SmartBuy!</h4>
              <p className="welcome-description">
                🎯 Your SmartBuy journey starts here! Explore our amazing features, discover great deals, 
                and enjoy a secure and personalized shopping experience tailored just for you.
              </p>
              <button className="btn-primary" onClick={() => navigate('/products')}>Start Your Shopping Journey</button>
              <div className="feature-tags">
                <span className="feature-tag">✨ Premium Quality</span>
                <span className="feature-tag">🚚 Fast Delivery</span>
                <span className="feature-tag">🔒 Secure Shopping</span>
                <span className="feature-tag">💰 Best Prices</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
