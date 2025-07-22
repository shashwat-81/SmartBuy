import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Phone input, 2: OTP input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', {
        phone
      });

      if (response.data.success) {
        setSuccess('OTP sent to your phone successfully!');
        setStep(2);
        // For demo, show the OTP in console/alert
        if (response.data.data.otp) {
          alert(`Your OTP is: ${response.data.data.otp}`);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Failed to send OTP. Please check your phone number and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        phone,
        otp
      });

      if (response.data.success) {
        const { user, token } = response.data.data;
        login(user, token);
        setSuccess('Login successful! Redirecting to explore...');
        setTimeout(() => navigate('/categories'), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Invalid OTP. Please try again.'
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
        phone
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Sign in to your account' : 'Enter OTP'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 1 ? (
              <>
                Or{' '}
                <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                  create a new account
                </Link>
              </>
            ) : (
              `We sent a verification code to ${phone}`
            )}
          </p>
        </div>

        {/* Messages */}
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        {/* Forms */}
        {step === 1 ? (
          /* Phone Input Form */
          <form onSubmit={handleSendOTP} className="login-form">
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !phone}
              className="submit-btn"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                'Send OTP'
              )}
            </button>
          </form>
        ) : (
          /* OTP Verification Form */
          <form onSubmit={handleVerifyOTP} className="login-form">
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength="6"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                className="form-input"
                placeholder="000000"
              />
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="submit-btn"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify & Login'
              )}
            </button>

            <div className="otp-actions">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="back-link"
              >
                ← Change phone number
              </button>
              <button
                type="button"
                onClick={resendOTP}
                disabled={loading}
                className="resend-link"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

        {/* Action Links */}
        <div className="action-links">
          <div className="text-sm text-gray-600 mb-2">
            🔒 Secure OTP-based authentication
          </div>
          {/* <div className="text-xs text-gray-500">
            For demo: Check the alert/console for OTP
          </div> */}
        </div>

        {/* Footer */}
        <div className="login-footer">
          {/* ... existing footer content ... */}
        </div>
      </div>
    </div>
  );
};

export default Login;
