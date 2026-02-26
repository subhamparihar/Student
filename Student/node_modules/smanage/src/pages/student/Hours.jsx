import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Modal from '../../components/Modal';
import '../../styles/pages/student-hours.css';

const StudentHours = () => {
  const { user } = useAuth();
  const { getApplicationsByStudency, getHoursByStudent, logHours, jobs } = useData();
  const [showModal, setShowModal] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState('');
  const [formData, setFormData] = useState({
    hours: '',
    description: '',
  });

  const studentApplications = getApplicationsByStudency(user.id)
    .filter((app) => app.status === 'approved');
  const hoursLogs = getHoursByStudent(user.id);
  const totalHours = hoursLogs.reduce((sum, log) => sum + log.hours, 0);

  const handleOpenModal = () => {
    if (studentApplications.length === 0) {
      alert('You need to have an approved application to log hours');
      return;
    }
    if (studentApplications.length > 0) {
      setSelectedApplicationId(studentApplications[0].id);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ hours: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.hours || !formData.description || !selectedApplicationId) {
      alert('Please fill in all fields');
      return;
    }

    const hours = parseFloat(formData.hours);
    if (hours <= 0) {
      alert('Hours must be greater than 0');
      return;
    }

    logHours(selectedApplicationId, user.id, hours, formData.description);
    alert('Hours logged successfully');
    handleCloseModal();
  };

  const getJobTitle = (jobId) => {
    const job = jobs.find((j) => j.id === jobId);
    return job?.title || 'Unknown Job';
  };

  const monthlyEarnings = (totalHours * 12.50).toFixed(2);

  return (
    <div className="student-hours-page">
      <div className="page-header">
        <h1>Work Hours Tracker</h1>
        <p>Log and manage your work hours</p>
      </div>

      {/* Summary Stats */}
      <div className="hours-summary">
        <div className="summary-card">
          <div className="summary-icon">⏱️</div>
          <div className="summary-content">
            <div className="summary-label">Total Hours</div>
            <div className="summary-value">{totalHours}</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">💰</div>
          <div className="summary-content">
            <div className="summary-label">Estimated Earnings</div>
            <div className="summary-value">${monthlyEarnings}</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📝</div>
          <div className="summary-content">
            <div className="summary-label">Log Entries</div>
            <div className="summary-value">{hoursLogs.length}</div>
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">✅</div>
          <div className="summary-content">
            <div className="summary-label">Active Positions</div>
            <div className="summary-value">{studentApplications.length}</div>
          </div>
        </div>
      </div>

      {/* Log Hours Button */}
      <div className="action-bar">
        <button
          className="btn btn-primary btn-lg"
          onClick={handleOpenModal}
          disabled={studentApplications.length === 0}
        >
          + Log Hours
        </button>
        {studentApplications.length === 0 && (
          <p className="warning-text">You need an approved application to log hours</p>
        )}
      </div>

      {/* Hours Logs */}
      {hoursLogs.length > 0 ? (
        <section className="hours-logs-section">
          <h2>Your Hours Log</h2>
          <div className="hours-logs-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Position</th>
                  <th>Hours</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {hoursLogs.map((log) => {
                  const app = studentApplications.find((a) => a.id === log.applicationId);
                  return (
                    <tr key={log.id}>
                      <td>{new Date(log.date).toLocaleDateString()}</td>
                      <td>{getJobTitle(app?.jobId || '')}</td>
                      <td className="hours-cell">{log.hours} hrs</td>
                      <td>{log.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No hours logged yet</h3>
          <p>Start by logging your first work session</p>
          <button
            className="btn btn-primary"
            onClick={handleOpenModal}
            disabled={studentApplications.length === 0}
          >
            Log Your First Hours
          </button>
        </div>
      )}

      {/* Hours Form Modal */}
      <Modal
        isOpen={showModal}
        title="Log Work Hours"
        onClose={handleCloseModal}
        size="medium"
        footer={
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Log Hours
            </button>
          </div>
        }
      >
        <form className="hours-form">
          <div className="form-group">
            <label htmlFor="application" className="form-label">Position *</label>
            <select
              id="application"
              value={selectedApplicationId}
              onChange={(e) => setSelectedApplicationId(e.target.value)}
              className="form-input"
            >
              <option value="">Select a position</option>
              {studentApplications.map((app) => (
                <option key={app.id} value={app.id}>
                  {getJobTitle(app.jobId)}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="hours" className="form-label">Hours Worked *</label>
            <input
              id="hours"
              type="number"
              name="hours"
              value={formData.hours}
              onChange={handleInputChange}
              placeholder="e.g., 4"
              step="0.5"
              min="0.5"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what you worked on..."
              className="form-textarea"
              rows="4"
            />
          </div>

          <div className="info-box">
            <p>✓ All hours will be reviewed by your supervisor</p>
            <p>✓ You'll earn {studentApplications.length > 0 && `$${(parseFloat(formData.hours || 0) * 12.50).toFixed(2)}`} for the hours logged</p>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentHours;
