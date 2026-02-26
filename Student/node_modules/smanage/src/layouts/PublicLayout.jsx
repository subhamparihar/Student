import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/layouts.css';

const PublicLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <div className="footer-content">
          <p>&copy; 2026 Student Work-Study Management System. All rights reserved.</p>
          <p>For support, contact <a href="mailto:workstudy@university.edu">workstudy@university.edu</a></p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
