import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import '../styles/pages/job-details.css';

const JobDetails = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { getJobById, applyForJob } = useData();
  const navigate = useNavigate();

  const job = getJobById(id);

  if (!job) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Job Not Found</h2>
          <p>The job you're looking for doesn't exist.</p>
          <Link to="/jobs" className="btn btn-primary">Back to Jobs</Link>
        </div>
      </div>
    );
  }

  const handleApply = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = applyForJob(id, user.id, user.name);
    if (result.success) {
      alert('Application submitted successfully!');
      navigate('/student/applications');
    } else {
      alert(result.error);
    }
  };

  const salary = (job.payRate * job.hoursPerWeek * 4).toFixed(2); // Monthly estimate

  return (
    <div className="job-details-page">
      <div className="page-container">
        <Link to="/jobs" className="back-link">← Back to Jobs</Link>

        <article className="job-details-article">
          {/* Header */}
          <header className="job-header">
            <div className="job-title-section">
              <h1>{job.title}</h1>
              <span className={`status-badge status-${job.status}`}>{job.status}</span>
            </div>
            <p className="job-department">{job.department}</p>
          </header>

          {/* Content Grid */}
          <div className="details-grid">
            {/* Main Content */}
            <section className="details-main">
              <div className="description-section">
                <h2>Position Description</h2>
                <p>{job.description}</p>
              </div>

              <div className="requirements-section">
                <h2>Requirements & Details</h2>
                <ul className="requirements-list">
                  <li>
                    <span className="icon">⏰</span>
                    <span><strong>Hours per Week:</strong> {job.hoursPerWeek} hours</span>
                  </li>
                  <li>
                    <span className="icon">📊</span>
                    <span><strong>Total Required Hours:</strong> {job.hoursRequired} hours</span>
                  </li>
                  <li>
                    <span className="icon">💰</span>
                    <span><strong>Hourly Rate:</strong> ₹{job.payRate}/hour</span>
                  </li>
                  <li>
                    <span className="icon">📅</span>
                    <span><strong>Posted Date:</strong> {new Date(job.createdAt).toLocaleDateString()}</span>
                  </li>
                  <li>
                    <span className="icon">👥</span>
                    <span><strong>Applications:</strong> {job.applications.length} applicant{job.applications.length !== 1 ? 's' : ''}</span>
                  </li>
                </ul>
              </div>

              <div className="responsibilities-section">
                <h2>Key Responsibilities</h2>
                <ul className="responsibilities-list">
                  <li>Support departmental operations and initiatives</li>
                  <li>Assist with student-facing activities and services</li>
                  <li>Maintain professional communication and conduct</li>
                  <li>Track and log work hours accurately</li>
                  <li>Coordinate with supervisors on tasks and priorities</li>
                </ul>
              </div>

              {job.status === 'closed' && (
                <div className="closed-notice">
                  <p>This position is currently closed and not accepting applications.</p>
                </div>
              )}
            </section>

            {/* Sidebar */}
            <aside className="details-sidebar">
              <div className="info-card">
                <h3>Compensation</h3>
                <div className="compensation-details">
                  <div className="comp-row">
                    <span>Hourly Rate</span>
                    <strong>₹{job.payRate}</strong>
                  </div>
                  <div className="comp-row">
                    <span>Estimated Monthly</span>
                    <strong>₹{salary}</strong>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <h3>Time Commitment</h3>
                <div className="comp-row">
                  <span>Hours/Week</span>
                  <strong>{job.hoursPerWeek}</strong>
                </div>
                <div className="comp-row">
                  <span>Total Hours</span>
                  <strong>{job.hoursRequired}</strong>
                </div>
              </div>

              <div className="apply-section">
                {job.status === 'open' ? (
                  <>
                    {!isAuthenticated ? (
                      <p className="auth-notice">Sign in to apply for this position</p>
                    ) : null}
                    <button
                      className="btn btn-primary btn-block"
                      onClick={handleApply}
                    >
                      Apply Now
                    </button>
                  </>
                ) : (
                  <button className="btn btn-disabled btn-block" disabled>
                    Position Closed
                  </button>
                )}
              </div>

              <div className="info-card">
                <h3>Department</h3>
                <p className="dept-name">{job.department}</p>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
};

export default JobDetails;
