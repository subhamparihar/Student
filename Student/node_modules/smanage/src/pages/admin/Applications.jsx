import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import ApplicationCard from '../../components/ApplicationCard';
import Modal from '../../components/Modal';
import '../../styles/pages/admin-applications.css';

const AdminApplications = () => {
  const { applications, jobs, approveApplication, rejectApplication, updateApplicationFeedback } = useData();
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');

  const filteredApplications = filterStatus === 'all'
    ? applications
    : applications.filter((app) => app.status === filterStatus);

  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const handleApprove = (applicationId) => {
    if (confirm('Approve this application?')) {
      approveApplication(applicationId);
      alert('Application approved');
    }
  };

  const handleReject = (applicationId) => {
    if (confirm('Reject this application?')) {
      rejectApplication(applicationId);
      alert('Application rejected');
    }
  };

  const handleOpenFeedbackModal = (applicationId, currentFeedback = '') => {
    setSelectedApplicationId(applicationId);
    setFeedbackText(currentFeedback);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    setSelectedApplicationId(null);
    setFeedbackText('');
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim()) {
      alert('Please enter feedback');
      return;
    }

    updateApplicationFeedback(selectedApplicationId, feedbackText);
    alert('Feedback added successfully');
    handleCloseFeedbackModal();
  };

  return (
    <div className="admin-applications-page">
      <div className="page-header">
        <h1>Manage Applications</h1>
        <p>Review and manage student applications</p>
      </div>

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
        <div className="results-count">
          {filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredApplications.length > 0 ? (
        <div className="applications-grid">
          {filteredApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              jobTitle={getJobTitle(app.jobId)}
              onApprove={handleApprove}
              onReject={handleReject}
              onViewFeedback={handleOpenFeedbackModal}
              isAdmin={true}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No applications found</h3>
          <p>There are no applications matching your filter</p>
        </div>
      )}

      {/* Feedback Modal */}
      <Modal
        isOpen={showFeedbackModal}
        title="Add Feedback"
        onClose={handleCloseFeedbackModal}
        size="medium"
        footer={
          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={handleCloseFeedbackModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmitFeedback}
            >
              Save Feedback
            </button>
          </div>
        }
      >
        <div className="feedback-form">
          <label htmlFor="feedback" className="form-label">Feedback Message</label>
          <textarea
            id="feedback"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Provide feedback about the student's performance..."
            className="form-textarea"
            rows="6"
          />
          <p className="helper-text">This feedback will be visible to the student</p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminApplications;
