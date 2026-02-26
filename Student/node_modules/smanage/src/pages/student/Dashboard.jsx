import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StatCard from '../../components/StatCard';
import '../../styles/pages/dashboard.css';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { applications, getTotalHoursByStudent, getApplicationsByStudency, jobs } = useData();

  const studentApplications = getApplicationsByStudency(user.id);
  const approvedApplications = studentApplications.filter((app) => app.status === 'approved');
  const totalHours = getTotalHoursByStudent(user.id);

  const getActiveJob = () => {
    const approved = approvedApplications.find((app) => app.status === 'approved');
    if (approved) {
      const job = jobs.find((j) => j.id === approved.jobId);
      return job;
    }
    return null;
  };

  const activeJob = getActiveJob();

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Welcome, {user.name}</h1>
        <p>Manage your work-study positions</p>
      </div>

      <div className="dashboard-grid">
        <StatCard
          icon="📝"
          label="Total Applications"
          value={studentApplications.length}
          color="blue"
        />
        <StatCard
          icon="✅"
          label="Approved Positions"
          value={approvedApplications.length}
          color="green"
        />
        <StatCard
          icon="⏰"
          label="Total Hours Worked"
          value={totalHours}
          color="orange"
        />
        <StatCard
          icon="💰"
          label="Estimated Earnings"
          value={`₹${(totalHours * 1063).toFixed(0)}`}
          color="purple"
        />
      </div>

      <div className="dashboard-sections">
        {activeJob && (
          <section className="dashboard-section">
            <h2>Your Current Position</h2>
            <div className="current-job-card">
              <div className="job-info">
                <h3>{activeJob.title}</h3>
                <p className="department">{activeJob.department}</p>
              </div>
              <div className="job-details">
                <div className="detail">
                  <span className="label">Pay Rate</span>
                  <span className="value">₹{activeJob.payRate}/hour</span>
                </div>
                <div className="detail">
                  <span className="label">Hours/Week</span>
                  <span className="value">{activeJob.hoursPerWeek}</span>
                </div>
                <div className="detail">
                  <span className="label">Hours Logged</span>
                  <span className="value">{approvedApplications[0]?.hoursLogged || 0}</span>
                </div>
              </div>
              <a href="/student/hours" className="btn btn-secondary">Log Hours</a>
            </div>
          </section>
        )}

        <section className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/jobs" className="action-card">
              <div className="action-icon">🔍</div>
              <h3>Browse Jobs</h3>
              <p>Find new work-study opportunities</p>
            </a>
            <a href="/student/applications" className="action-card">
              <div className="action-icon">📋</div>
              <h3>My Applications</h3>
              <p>View your submitted applications</p>
            </a>
            <a href="/student/hours" className="action-card">
              <div className="action-icon">⏰</div>
              <h3>Log Hours</h3>
              <p>Record your work hours</p>
            </a>
            <a href="/student/applications" className="action-card">
              <div className="action-icon">⭐</div>
              <h3>View Feedback</h3>
              <p>See feedback from supervisors</p>
            </a>
          </div>
        </section>

        {studentApplications.length > 0 && (
          <section className="dashboard-section">
            <h2>Your Applications</h2>
            <div className="applications-summary">
              {studentApplications.slice(0, 3).map((app) => {
                const job = jobs.find((j) => j.id === app.jobId);
                return (
                  <div key={app.id} className="summary-item">
                    <div className="summary-info">
                      <p className="job-title">{job?.title}</p>
                      <p className="applied-date">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge status-${app.status}`}>
                      {app.status}
                    </span>
                  </div>
                );
              })}
            </div>
            <a href="/student/applications" className="btn btn-secondary btn-block">View All Applications</a>
          </section>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
