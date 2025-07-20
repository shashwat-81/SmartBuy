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
    <div className="dashboard-bg" style={{minHeight: '100vh'}}>
      {/* Top Bar */}
      <div className="dashboard-nav" style={{marginBottom: 32}}>
        <div className="nav-content" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: 0,
              height: 32
            }}
            aria-label="Back to Dashboard"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="nav-logo" style={{gap: 10, display: 'flex', alignItems: 'center'}}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={28} height={28}>
              <circle cx="12" cy="12" r="14" stroke="#fff" strokeWidth="2" fill="#2874f0" />
              <path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </div>
        </div>
      </div>
      {/* Profile Card */}
      <div style={{maxWidth: 400, margin: '0 auto', position: 'relative', zIndex: 1}}>
        {/* Floating Avatar */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: -48,
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}>
          <div style={{
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2874f0 0%, #1e5bb8 100%)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 700,
            border: '5px solid #fff',
            boxShadow: '0 4px 16px 0 rgba(40,116,240,0.15)'
          }}>
            {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        <div className="card" style={{
          padding: '72px 32px 32px 32px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          borderRadius: 18,
          boxShadow: '0 8px 32px 0 rgba(40,116,240,0.10)',
          marginTop: 48,
          background: '#fff',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{margin: '0 0 4px 0', color: '#212121', fontWeight: 600, fontSize: 24, textAlign: 'center'}}>{profile?.name || user?.name || 'User'}</h2>
          <div style={{color: '#878787', fontSize: 15, marginBottom: 18, textAlign: 'center'}}>Manage your account information</div>
          {error && (
            <div className="error-message" style={{background: '#fed7d7', color: '#c53030', padding: 16, borderRadius: 8, margin: 16, textAlign: 'center'}}>
              <svg fill="currentColor" viewBox="0 0 20 20" width={20} height={20} style={{marginRight: 8, verticalAlign: 'middle'}}>
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          {/* Info Section */}
          <div className="info-grid" style={{padding: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 20, marginBottom: 28}}>
            <div className="info-item" style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{color: '#2874f0', display: 'flex', alignItems: 'center'}}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <div>
                <div className="info-label">Full Name</div>
                <div className="info-value">{profile?.name || user?.name || 'Not provided'}</div>
              </div>
            </div>
            <div className="info-item" style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{color: '#2874f0', display: 'flex', alignItems: 'center'}}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </span>
              <div>
                <div className="info-label">Email</div>
                <div className="info-value">{profile?.email || user?.email || 'Not provided'}</div>
              </div>
            </div>
            <div className="info-item" style={{display: 'flex', alignItems: 'center', gap: 12}}>
              <span style={{color: '#2874f0', display: 'flex', alignItems: 'center'}}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 5h2M7 5h2M11 5h2M15 5h2M19 5h2M3 10h2m4 0h2m4 0h2m4 0h2M3 15h2m4 0h2m4 0h2m4 0h2" /></svg>
              </span>
              <div>
                <div className="info-label">Phone</div>
                <div className="info-value">{profile?.phone || user?.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div style={{display: 'flex', gap: 12, marginBottom: 12}}>
            <button className="btn-primary" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#2874f0', borderRadius: 8, height: 44, fontSize: 16}} onClick={handleEditProfile}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={20} height={20}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Profile
            </button>
            <button className="btn-primary" style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#2874f0', borderRadius: 8, height: 44, fontSize: 16}}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={20} height={20}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Change Password
            </button>
          </div>
          <button className="btn-primary" style={{width: '100%', background: '#e53e3e', color: '#fff', marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, height: 44, fontSize: 16}} onClick={handleLogout}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
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
    </div>
  );
};

export default Profile;
