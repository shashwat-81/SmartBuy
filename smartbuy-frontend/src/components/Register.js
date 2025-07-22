import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [step, setStep] = useState(1); // 1: Register form, 2: OTP verification
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
      if (response.data.success) {
        setSuccess('Registration successful! Please verify your phone with OTP.');
        setStep(2);
        // For demo, show the OTP in console/alert
        if (response.data.data.otp) {
          alert(`Your OTP is: ${response.data.data.otp}`);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone: formData.phone,
        otp
      });

      if (response.data.success) {
        const { user, token } = response.data.data;
        login(user, token);
        setSuccess('Account verified successfully! Redirecting to explore...');
        setTimeout(() => navigate('/categories'), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'OTP verification failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        phone: formData.phone
      });

      if (response.data.success) {
        setSuccess('OTP resent successfully!');
        if (response.data.data.otp) {
          alert(`Your new OTP is: ${response.data.data.otp}`);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to resend OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>
            {step === 1 ? 'Create your account' : 'Verify your phone'}
          </h2>
          <p>
            {step === 1 ? (
              <>
                Or{' '}
                <Link to="/login">
                  sign in to your account
                </Link>
              </>
            ) : (
              `We sent a verification code to ${formData.phone}`
            )}
          </p>
        </div>

        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        {step === 1 ? (
          <form onSubmit={handleRegister} className="register-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-input"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                required
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-input"
                required
                minLength="6"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerification} className="register-form">
            <div className="form-group">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                name="otp"
                className="form-input otp-input"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="000000"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <div className="otp-actions">
              <button type="button" onClick={() => setStep(1)} className="back-link">
                ← Back to registration
              </button>
              <button type="button" onClick={resendOTP} disabled={loading} className="resend-link">
                Resend OTP
              </button>
            </div>
          </form>
        )}

        <div className="register-footer">
          🔒 Your information is encrypted and secure
        </div>
      </div>
    </div>
  );
};

export default Register;
