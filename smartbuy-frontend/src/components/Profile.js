import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import './Dashboard.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // 1. Define the function
  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/auth/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      setProfile(data.data.user); // or setProfile(data) depending on your backend response
      setUser(data.data.user); // Assuming the user data is nested under data.user
    } else {
      setError('Failed to load profile data');
    }
    setLoading(false);
  };

  // 2. Call it in useEffect
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchProfile();
  }, [navigate]);

  const handleEditProfile = () => {
    setEditFormData({
      name: profile?.name || user?.name || '',
      email: profile?.email || user?.email || '',
      phone: profile?.phone || user?.phone || ''
    });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editFormData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setProfile(data.data.user);
        setUser(data.data.user);
        setShowEditModal(false);
        // Show success message (optional)
        alert('Profile updated successfully!');
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = () => {
    setPasswordFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowChangePasswordModal(true);
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsChangingPassword(true);
    setError('');

    // Validate passwords match
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setError('New passwords do not match');
      setIsChangingPassword(false);
      return;
    }

    // Validate password length
    if (passwordFormData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setIsChangingPassword(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordFormData.currentPassword,
          newPassword: passwordFormData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setShowChangePasswordModal(false);
        alert('Password changed successfully!');
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="profile-loading dashboard-bg" style={{minHeight: '100vh'}}>
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Single Navigation Bar */}
      <nav className="profile-nav">
        <div className="nav-wrapper">
          <div className="nav-left">
            <button onClick={() => navigate('/dashboard')} className="back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </button>
          </div>
          
          <div className="nav-center">
            <button 
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
              Profile
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Orders
            </button>
            
            <button 
              className={`nav-link ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
              </svg>
              Addresses
            </button>
          </div>
          
          <div className="nav-right">
            <button className="logout-btn" onClick={handleLogout}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="profile-content">
        {activeTab === 'profile' && (
          <div className="profile-section">
            <div className="profile-header">
              <div className="profile-avatar">
                {profile?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <h2>{profile?.name || 'User'}</h2>
              <p>{profile?.email}</p>
            </div>
            
            <div className="profile-details">
              <div className="info-card">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{profile?.phone || 'Add Phone'}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button onClick={handleEditProfile} className="btn-action">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit Profile
                </button>
                <button onClick={handleChangePassword} className="btn-action">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'orders' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Recent Orders</h3>
              <button className="btn-view-all" onClick={() => navigate('/orders')}>View All</button>
            </div>
            <div className="orders-grid">
              {orders?.length > 0 ? (
                orders.map((order) => (
                  <div key={order._id} className="order-card">
                    <div className="order-header">
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-items">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item._id} className="order-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-details">
                            <h4>{item.name}</h4>
                            <p>₹{item.price}</p>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <span className="order-total">Total: ₹{order.totalAmount}</span>
                      <button className="btn-track">Track Order</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No orders placed yet</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'addresses' && (
          <div className="profile-section">
            <div className="section-header">
              <h3>Saved Addresses</h3>
              <button className="btn-add">Add New Address</button>
            </div>
            <div className="addresses-grid">
              {addresses?.length > 0 ? (
                addresses.map((address) => (
                  <div key={address._id} className="address-card">
                    <div className="address-type">{address.type}</div>
                    <h4>{address.name}</h4>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.pincode}</p>
                    <p>Phone: {address.phone}</p>
                    <div className="card-actions">
                      <button className="btn-edit">Edit</button>
                      <button className="btn-delete">Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No addresses saved yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={(e) => e.target.classList.contains('modal-overlay') && setShowEditModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{color: '#2874f0', margin: 0, fontSize: '24px', fontWeight: 600}}>Edit Profile</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowEditModal(false)}
                style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666'}}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdateProfile} className="edit-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleEditInputChange}
                  required
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-cancel"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-update"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="modal-overlay" onClick={(e) => e.target.classList.contains('modal-overlay') && setShowChangePasswordModal(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 style={{color: '#2874f0', margin: 0, fontSize: '24px', fontWeight: 600}}>Change Password</h2>
              <button 
                className="modal-close-btn"
                onClick={() => setShowChangePasswordModal(false)}
                style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666'}}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUpdatePassword} className="edit-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordFormData.currentPassword}
                  onChange={handlePasswordInputChange}
                  required
                  placeholder="Enter your current password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordFormData.newPassword}
                  onChange={handlePasswordInputChange}
                  required
                  minLength="6"
                  placeholder="Enter your new password (min 6 characters)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordFormData.confirmPassword}
                  onChange={handlePasswordInputChange}
                  required
                  minLength="6"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                  className="btn-cancel"
                  disabled={isChangingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-update"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
