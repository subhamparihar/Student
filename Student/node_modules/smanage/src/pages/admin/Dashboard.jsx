import React from 'react';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/StatCard';
import '../../styles/pages/dashboard.css';

const AdminDashboard = () => {
  const { jobs, applications } = useData();

  const totalJobs = jobs.length;
  const openJobs = jobs.filter((job) => job.status === 'open').length;
  const totalApplications = applications.length;
  const pendingApplications = applications.filter((app) => app.status === 'pending').length;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage work-study positions and applications</p>
      </div>

      <div className="dashboard-grid">
        <StatCard
          icon="📋"
          label="Total Job Postings"
          value={totalJobs}
          color="blue"
        />
        <StatCard
          icon="🔓"
          label="Open Positions"
          value={openJobs}
          color="green"
        />
        <StatCard
          icon="📝"
          label="Total Applications"
          value={totalApplications}
          color="orange"
        />
        <StatCard
          icon="⏳"
          label="Pending Applications"
          value={pendingApplications}
          color="red"
        />
      </div>

      <div className="dashboard-sections">
        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/admin/jobs" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Post New Job</h3>
              <p>Create a new work-study opportunity</p>
            </a>
            <a href="/admin/jobs" className="action-card">
              <div className="action-icon">✏️</div>
              <h3>Manage Jobs</h3>
              <p>Edit or delete existing positions</p>
            </a>
            <a href="/admin/applications" className="action-card">
              <div className="action-icon">👥</div>
              <h3>Review Applications</h3>
              <p>Approve or reject pending applications</p>
            </a>
            <a href="/admin/applications" className="action-card">
              <div className="action-icon">⭐</div>
              <h3>Provide Feedback</h3>
              <p>Give performance feedback to students</p>
            </a>
          </div>
        </section>

        <section className="dashboard-section">
          <h2>Recent Applications</h2>
          {applications.length > 0 ? (
            <div className="recent-list">
              {applications.slice(0, 5).map((app) => (
                <div key={app.id} className="recent-item">
                  <div className="recent-info">
                    <p className="student-name">{app.studentName}</p>
                    <p className="job-title">Job ID: {app.jobId}</p>
                  </div>
                  <span className={`status-badge status-${app.status}`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-message">No applications yet</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
