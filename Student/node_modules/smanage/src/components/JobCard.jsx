import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/card.css';

/**
 * JobCard Component - Displays job information in a card format
 */
const JobCard = ({ job, onApply, onEdit, onDelete, actions = 'view' }) => {
  return (
    <div className={`job-card card ${job.status === 'closed' ? 'closed' : ''}`}>
      <div className="card-header">
        <h3 className="card-title">{job.title}</h3>
        <span className={`status-badge status-${job.status}`}>{job.status}</span>
      </div>

      <div className="card-body">
        <div className="job-info">
          <div className="info-row">
            <span className="label">Department:</span>
            <span className="value">{job.department}</span>
          </div>
          <div className="info-row">
            <span className="label">Pay Rate:</span>
            <span className="value salary">₹{job.payRate}/hour</span>
          </div>
          <div className="info-row">
            <span className="label">Hours/Week:</span>
            <span className="value">{job.hoursPerWeek} hours</span>
          </div>
          <div className="info-row">
            <span className="label">Total Required:</span>
            <span className="value">{job.hoursRequired} hours</span>
          </div>
        </div>

        <p className="description">{job.description}</p>
      </div>

      <div className="card-footer">
        <div className="actions">
          {actions === 'view' && (
            <>
              <Link to={`/jobs/${job.id}`} className="btn btn-secondary btn-sm">
                View Details
              </Link>
              {job.status === 'open' && (
                <button className="btn btn-primary btn-sm" onClick={() => onApply && onApply(job.id)}>
                  Apply Now
                </button>
              )}
              {job.status === 'closed' && (
                <button className="btn btn-disabled btn-sm" disabled>
                  Position Closed
                </button>
              )}
            </>
          )}

          {actions === 'admin' && (
            <>
              <button className="btn btn-secondary btn-sm" onClick={() => onEdit && onEdit(job.id)}>
                Edit
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete && onDelete(job.id)}>
                Delete
              </button>
            </>
          )}
        </div>
        <div className="applications-count">
          {job.applications.length} application{job.applications.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
