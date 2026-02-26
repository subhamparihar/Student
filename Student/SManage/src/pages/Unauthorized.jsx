import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/error.css';

const Unauthorized = () => {
  return (
    <div className="error-page">
      <div className="error-container">
        <div className="error-icon">🔒</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <div className="error-details">
          <p>Your current role doesn't allow you to access this section.</p>
          <p>Please contact an administrator if you believe this is a mistake.</p>
        </div>
        <div className="error-actions">
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/jobs" className="btn btn-secondary">Browse Jobs</Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
