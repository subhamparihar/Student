import React from 'react';
import '../styles/stat-card.css';

/**
 * StatCard Component - Displays statistics in card format
 */
const StatCard = ({ icon, label, value, color = 'blue' }) => {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
