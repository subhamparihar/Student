import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={handleNavClick}>
          <span className="brand-icon">📚</span>
          <span className="brand-text">SManage</span>
        </Link>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {/* Public Navigation */}
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/jobs"
                className={`nav-link ${location.pathname === '/jobs' ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                Jobs
              </Link>
            </li>

            {/* Admin Navigation */}
            {isAuthenticated && user?.role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link
                    to="/admin"
                    className={`nav-link ${location.pathname.startsWith('/admin') ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/jobs"
                    className={`nav-link ${location.pathname === '/admin/jobs' ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Manage Jobs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/admin/applications"
                    className={`nav-link ${location.pathname === '/admin/applications' ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Applications
                  </Link>
                </li>
              </>
            )}

            {/* Student Navigation */}
            {isAuthenticated && user?.role === 'student' && (
              <>
                <li className="nav-item">
                  <Link
                    to="/student"
                    className={`nav-link ${location.pathname.startsWith('/student') ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/student/applications"
                    className={`nav-link ${location.pathname === '/student/applications' ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    My Applications
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/student/hours"
                    className={`nav-link ${location.pathname === '/student/hours' ? 'active' : ''}`}
                    onClick={handleNavClick}
                  >
                    Hours
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="navbar-auth">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">
                  {user?.name} <span className="role-badge">{user?.role}</span>
                </span>
                <button className="btn btn-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-secondary" onClick={handleNavClick}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" onClick={handleNavClick}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
