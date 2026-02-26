import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/pages/home.css';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else if (user?.role === 'student') {
        navigate('/student');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Student Work-Study Management System</h1>
          <p>Manage your academic work-study positions and track your progress</p>
          <div className="hero-buttons">
            {!isAuthenticated && (
              <>
                <Link to="/jobs" className="btn btn-primary btn-lg">
                  Browse Jobs
                </Link>
                <Link to="/login" className="btn btn-secondary btn-lg">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-icon">📚</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Browse Opportunities</h3>
            <p>Explore available work-study positions across campus departments</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Apply & Track</h3>
            <p>Apply for positions and monitor the status of your applications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Log Hours</h3>
            <p>Record your work hours and track total earnings and progress</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Get Feedback</h3>
            <p>Receive valuable feedback from supervisors about your performance</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Students Employed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45+</div>
            <div className="stat-label">Active Positions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">$2.5M</div>
            <div className="stat-label">Total Wages Paid</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">12,000+</div>
            <div className="stat-label">Hours Worked</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join our work-study program and build valuable work experience while supporting your education</p>
        <div className="cta-buttons">
          <Link to="/jobs" className="btn btn-primary btn-lg">
            Browse Available Jobs
          </Link>
          {!isAuthenticated && (
            <Link to="/register" className="btn btn-secondary btn-lg">
              Create an Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
