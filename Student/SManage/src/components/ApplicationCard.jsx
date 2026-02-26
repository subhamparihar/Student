import React from 'react';
import '../styles/card.css';

/**
 * ApplicationCard Component - Displays application status
 */
const ApplicationCard = ({
  application,
  jobTitle,
  onApprove,
  onReject,
  onViewFeedback,
  isAdmin = false,
}) => {
  return (
    <div className={`application-card card status-${application.status}`}>
      <div className="card-header">
        <h3 className="card-title">{jobTitle || 'Work-Study Position'}</h3>
        <span className={`status-badge status-${application.status}`}>
          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
        </span>
      </div>

      <div className="card-body">
        {!isAdmin && (
          <div className="info-row">
            <span className="label">Applicant:</span>
            <span className="value">{application.studentName}</span>
          </div>
        )}
        <div className="info-row">
          <span className="label">Applied On:</span>
          <span className="value">{new Date(application.appliedAt).toLocaleDateString()}</span>
        </div>
        <div className="info-row">
          <span className="label">Hours Logged:</span>
          <span className="value">{application.hoursLogged} hours</span>
        </div>

        {application.feedback && (
          <div className="feedback-section">
            <label className="label">Feedback:</label>
            <p className="feedback-text">{application.feedback}</p>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="card-footer">
          <div className="actions">
            {application.status === 'pending' && (
              <>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => onApprove && onApprove(application.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onReject && onReject(application.id)}
                >
                  Reject
                </button>
              </>
            )}
            {(application.status === 'approved' || application.status === 'rejected') && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onViewFeedback && onViewFeedback(application.id)}
              >
                Add Feedback
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
