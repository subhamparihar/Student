import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ApplicationCard from '../../components/ApplicationCard';
import '../../styles/pages/student-applications.css';

const StudentApplications = () => {
  const { user } = useAuth();
  const { getApplicationsByStudency, jobs } = useData();
  const [filterStatus, setFilterStatus] = useState('all');

  const studentApplications = getApplicationsByStudency(user.id);
  const filteredApplications = filterStatus === 'all'
    ? studentApplications
    : studentApplications.filter((app) => app.status === filterStatus);

  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const statuses = {
    pending: studentApplications.filter((app) => app.status === 'pending').length,
    approved: studentApplications.filter((app) => app.status === 'approved').length,
    rejected: studentApplications.filter((app) => app.status === 'rejected').length,
  };

  return (
    <div className="student-applications-page">
      <div className="page-header">
        <h1>My Applications</h1>
        <p>Track your application status and feedback</p>
      </div>

      {/* Status Overview */}
      <div className="status-overview">
        <div className="status-card pending">
          <span className="status-count">{statuses.pending}</span>
          <span className="status-label">Pending</span>
        </div>
        <div className="status-card approved">
          <span className="status-count">{statuses.approved}</span>
          <span className="status-label">Approved</span>
        </div>
        <div className="status-card rejected">
          <span className="status-count">{statuses.rejected}</span>
          <span className="status-label">Rejected</span>
        </div>
      </div>

      {/* Filter */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="status-filter" className="filter-label">Filter by Status:</label>
          <select
            id="status-filter"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Applications</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <div className="applications-grid">
          {filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              jobTitle={getJobTitle(app.jobId)}
              isAdmin={false}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No applications yet</h3>
          <p>
            {studentApplications.length === 0
              ? "You haven't applied for any positions yet."
              : 'No applications matching your filter.'}
          </p>
          <a href="/jobs" className="btn btn-primary">Browse Available Jobs</a>
        </div>
      )}

      {/* Info Section */}
      {studentApplications.length === 0 && (
        <section className="info-section">
          <h2>How to Apply</h2>
          <ol className="steps-list">
            <li>
              <span className="step-number">1</span>
              <span className="step-text">Browse available work-study positions</span>
            </li>
            <li>
              <span className="step-number">2</span>
              <span className="step-text">Click "Apply Now" on a job you're interested in</span>
            </li>
            <li>
              <span className="step-number">3</span>
              <span className="step-text">Your application will be reviewed by the department</span>
            </li>
            <li>
              <span className="step-number">4</span>
              <span className="step-text">If approved, you can start logging work hours</span>
            </li>
          </ol>
          <a href="/jobs" className="btn btn-primary btn-lg">Start Applying</a>
        </section>
      )}
    </div>
  );
};

export default StudentApplications;
