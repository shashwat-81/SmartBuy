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
  const [stats, setStats] = useState({
    orders: 0,
    totalSpent: 0,
    wishlistItems: 0,
    cartItems: 0
  });
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
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        
        const newStats = {
          orders: 0,
          totalSpent: 0,
          wishlistItems: 0,
          cartItems: 0
        };

        const promises = [
          axios.get('http://localhost:5000/api/shop/wishlist', { headers })
            .then(response => {
              newStats.wishlistItems = response.data?.data?.length || response.data?.items?.length || 0;
            })
            .catch(() => {
              newStats.wishlistItems = 0;
            }),
          
          axios.get('http://localhost:5000/api/shop/cart', { headers })
            .then(response => {
              newStats.cartItems = response.data?.data?.length || response.data?.items?.length || 0;
            })
            .catch(() => {
              newStats.cartItems = 0;
            }),
          
          axios.get('http://localhost:5000/api/shop/orders', { headers })
            .then(response => {
              const orders = response.data?.data || response.data?.orders || [];
              newStats.orders = orders.length || 0;
              newStats.totalSpent = orders.reduce((total, order) => total + (order.totalAmount || order.total || 0), 0);
            })
            .catch(() => {
              newStats.orders = 0;
              newStats.totalSpent = 0;
            })
        ];

        await Promise.all(promises);
        setStats(newStats);

      } catch (err) {
        console.error('Error in fetchUserStats:', err);
        setStats({
          orders: 0,
          totalSpent: 0,
          wishlistItems: 0,
          cartItems: 0
        });
      }
    };

    fetchProfile();
    fetchUserStats();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner"></div>
          <h3>Loading Dashboard</h3>
          <p>Preparing your SmartBuy experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Navigation Header */}
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-left">
            <button
              onClick={() => navigate('/categories')}
              className="back-btn"
              title="Back to Categories"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H6m0 0l6 6m-6-6l6-6" />
              </svg>
              <span>Categories</span>
            </button>
          </div>
          
          <div className="nav-logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <h1 className="brand-text">SmartBuy</h1>
          </div>

          <div className="nav-quick-actions">
            <button 
              onClick={() => handleNavigation('/products')} 
              className="nav-action-btn"
              title="Shop Now"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Shop</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/orders')} 
              className="nav-action-btn"
              title="My Orders"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <span>Orders</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/wishlist')} 
              className="nav-action-btn"
              title="Wishlist"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <span>Wishlist</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/cart')} 
              className="nav-action-btn cart-btn"
              title="Shopping Cart"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <span>Cart</span>
              {stats.cartItems > 0 && <span className="cart-badge">{stats.cartItems}</span>}
            </button>
          </div>
          
          <div className="nav-actions">
            <button 
              onClick={handleProfileClick}
              className="profile-btn"
              title="My Profile"
            >
              <div className="profile-avatar">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="btn-logout"
              title="Sign Out"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Error Banner */}
          {error && (
            <div className="error-card">
              <div className="error-content">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-content">
              <div className="hero-text">
                <div className="icon-container">
                  <div className="hero-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
                <h1 className="hero-title">
                  Welcome to <span className="brand">SmartBuy</span>
                </h1>
                <p className="hero-description">
                  Your one-stop destination for all your shopping needs. Discover amazing products, great deals, and enjoy a seamless shopping experience.
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => handleNavigation('/products')}>
                    Start Shopping
                  </button>
                  <button className="btn-secondary" onClick={() => handleNavigation('/categories')}>
                    Explore Categories
                  </button>
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
          </section>

          {/* Stats Section */}
          <section className="stats-section">
            <h2>Your Shopping Overview</h2>
            <div className="stats-grid">
              <div className="stat-card" onClick={() => handleNavigation('/orders')} title="View your orders">
                <div className="stat-content">
                  <div className="stat-info">
                    <div className="stat-label">Total Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-description">
                      {stats.orders === 0 ? 
                        "🛒 Ready to place your first order? Start shopping!" : 
                        `You've successfully completed ${stats.orders} order${stats.orders !== 1 ? 's' : ''}!`
                      }
                    </div>
                  </div>
                  <div className="stat-icon orders">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="stat-card" onClick={() => handleNavigation('/orders')} title="View spending summary">
                <div className="stat-content">
                  <div className="stat-info">
                    <div className="stat-label">Total Spent</div>
                    <div className="stat-value">₹{stats.totalSpent.toLocaleString('en-IN')}</div>
                    <div className="stat-description">
                      {stats.totalSpent === 0 ? 
                        "💰 Start your shopping journey and discover amazing deals!" : 
                        `You've invested ₹${stats.totalSpent.toLocaleString('en-IN')} in quality products!`
                      }
                    </div>
                  </div>
                  <div className="stat-icon spending">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="stat-card" onClick={() => handleNavigation('/wishlist')} title="View your wishlist">
                <div className="stat-content">
                  <div className="stat-info">
                    <div className="stat-label">Wishlist Items</div>
                    <div className="stat-value">{stats.wishlistItems}</div>
                    <div className="stat-description">
                      {stats.wishlistItems === 0 ? 
                        "❤️ Save your favorite items to your wishlist!" : 
                        `${stats.wishlistItems} item${stats.wishlistItems !== 1 ? 's' : ''} waiting for you!`
                      }
                    </div>
                  </div>
                  <div className="stat-icon wishlist">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="stat-card" onClick={() => handleNavigation('/cart')} title="View your cart">
                <div className="stat-content">
                  <div className="stat-info">
                    <div className="stat-label">Cart Items</div>
                    <div className="stat-value">{stats.cartItems}</div>
                    <div className="stat-description">
                      {stats.cartItems === 0 ? 
                        "🛍️ Add some amazing products to your cart!" : 
                        `${stats.cartItems} item${stats.cartItems !== 1 ? 's' : ''} ready for checkout!`
                      }
                    </div>
                  </div>
                  <div className="stat-icon cart">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Welcome Card */}
          <section className="welcome-card">
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
              <button className="btn-primary" onClick={() => handleNavigation('/products')}>
                Start Your Shopping Journey
              </button>
              <div className="feature-tags">
                <span className="feature-tag">✨ Premium Quality</span>
                <span className="feature-tag">🚚 Fast Delivery</span>
                <span className="feature-tag">🔒 Secure Shopping</span>
                <span className="feature-tag">💰 Best Prices</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
