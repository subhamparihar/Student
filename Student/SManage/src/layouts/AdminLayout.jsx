import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/layouts.css';

const AdminLayout = () => {
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
            <h3 className="sidebar-title">Admin Menu</h3>
            <ul className="nav-list">
              <li>
                <Link
                  to="/admin"
                  className={`nav-link ${isActive('/admin') && !isActive('/admin/') ? 'active' : ''}`}
                >
                  <span className="icon">📊</span>
                  <span className="label">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className={`nav-link ${isActive('/admin/jobs') ? 'active' : ''}`}
                >
                  <span className="icon">📋</span>
                  <span className="label">Manage Jobs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/applications"
                  className={`nav-link ${isActive('/admin/applications') ? 'active' : ''}`}
                >
                  <span className="icon">👥</span>
                  <span className="label">Applications</span>
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
          <p>&copy; 2026 Student Work-Study Management System. Admin Panel.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
