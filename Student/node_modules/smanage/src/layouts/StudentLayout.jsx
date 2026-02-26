import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/layouts.css';

const StudentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div className="layout">
      <Navbar />
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            ☰
          </button>

          <nav className="sidebar-nav">
            <h3 className="sidebar-title">Student Menu</h3>
            <ul className="nav-list">
              <li>
                <Link
                  to="/student"
                  className={`nav-link ${isActive('/student') && !isActive('/student/') ? 'active' : ''}`}
                >
                  <span className="icon">📊</span>
                  <span className="label">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student/applications"
                  className={`nav-link ${isActive('/student/applications') ? 'active' : ''}`}
                >
                  <span className="icon">📋</span>
                  <span className="label">My Applications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/student/hours"
                  className={`nav-link ${isActive('/student/hours') ? 'active' : ''}`}
                >
                  <span className="icon">⏰</span>
                  <span className="label">Work Hours</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="nav-link"
                >
                  <span className="icon">🔍</span>
                  <span className="label">Browse Jobs</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>

      <footer className="layout-footer">
        <div className="footer-content">
          <p>&copy; 2026 Student Work-Study Management System. Student Portal.</p>
        </div>
      </footer>
    </div>
  );
};

export default StudentLayout;
