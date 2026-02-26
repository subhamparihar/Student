import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.passwordConfirm) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.name.length < 2) {
      setError('Name must be at least 2 characters');
      setLoading(false);
      return;
    }

    if (formData.password.length < 5) {
      setError('Password must be at least 5 characters');
      setLoading(false);
      return;
    }

    const result = register(
      formData.email,
      formData.name,
      formData.password,
      formData.passwordConfirm
    );

    setLoading(false);

    if (result.success) {
      navigate('/student');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">✍️</div>
            <h1>Create Account</h1>
            <p>Join our work-study program</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your university email"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="form-input"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
              <input
                id="passwordConfirm"
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="form-input"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Info Section */}
        <div className="demo-section">
          <h3>Welcome to SManage</h3>
          <p className="demo-description">By registering, you'll be able to:</p>
          <ul className="info-list">
            <li>✓ Browse available work-study positions</li>
            <li>✓ Apply for positions</li>
            <li>✓ Track your applications</li>
            <li>✓ Log work hours</li>
            <li>✓ View feedback from supervisors</li>
            <li>✓ Manage your profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
