import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import JobCard from '../../components/JobCard';
import Modal from '../../components/Modal';
import '../../styles/pages/admin-jobs.css';

const AdminJobs = () => {
  const { jobs, addJob, deleteJob, updateJob } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    hoursRequired: '',
    hoursPerWeek: '',
    payRate: '',
    status: 'open',
  });

  const handleOpenModal = (jobId = null) => {
    if (jobId) {
      const job = jobs.find((j) => j.id === jobId);
      if (job) {
        setFormData({
          title: job.title,
          department: job.department,
          description: job.description,
          hoursRequired: job.hoursRequired,
          hoursPerWeek: job.hoursPerWeek,
          payRate: job.payRate,
          status: job.status,
        });
        setEditingId(jobId);
      }
    } else {
      setFormData({
        title: '',
        department: '',
        description: '',
        hoursRequired: '',
        hoursPerWeek: '',
        payRate: '',
        status: 'open',
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
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

    if (!formData.title || !formData.department || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingId) {
      updateJob(editingId, {
        ...formData,
        hoursRequired: parseInt(formData.hoursRequired),
        hoursPerWeek: parseInt(formData.hoursPerWeek),
        payRate: parseFloat(formData.payRate),
      });
      alert('Job updated successfully');
    } else {
      addJob({
        ...formData,
        hoursRequired: parseInt(formData.hoursRequired),
        hoursPerWeek: parseInt(formData.hoursPerWeek),
        payRate: parseFloat(formData.payRate),
      });
      alert('Job posted successfully');
    }

    handleCloseModal();
  };

  const handleDelete = (jobId) => {
    if (confirm('Are you sure you want to delete this job?')) {
      deleteJob(jobId);
      alert('Job deleted successfully');
    }
  };

  return (
    <div className="admin-jobs-page">
      <div className="page-header">
        <h1>Manage Job Postings</h1>
        <button
          className="btn btn-primary"
          onClick={() => handleOpenModal()}
        >
          + Post New Job
        </button>
      </div>

      {jobs.length > 0 ? (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onEdit={handleOpenModal}
              onDelete={handleDelete}
              actions="admin"
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No job postings yet</h3>
          <p>Create your first job posting to get started</p>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenModal()}
          >
            Post New Job
          </button>
        </div>
      )}

      {/* Job Form Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Job Posting' : 'Post New Job'}
        onClose={handleCloseModal}
        size="large"
        footer={
          <div className="modal-actions">
            <button
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              {editingId ? 'Update Job' : 'Post Job'}
            </button>
          </div>
        }
      >
        <form className="job-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Job Title *</label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Library Assistant"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Department *</label>
            <input
              id="department"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="e.g., Library Services"
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
              placeholder="Describe the job and responsibilities"
              className="form-textarea"
              rows="5"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hoursPerWeek" className="form-label">Hours Per Week *</label>
              <input
                id="hoursPerWeek"
                type="number"
                name="hoursPerWeek"
                value={formData.hoursPerWeek}
                onChange={handleInputChange}
                placeholder="e.g., 10"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hoursRequired" className="form-label">Total Hours Required *</label>
              <input
                id="hoursRequired"
                type="number"
                name="hoursRequired"
                value={formData.hoursRequired}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="payRate" className="form-label">Hourly Pay Rate (₹) *</label>
              <input
                id="payRate"
                type="number"
                name="payRate"
                value={formData.payRate}
                onChange={handleInputChange}
                placeholder="e.g., 1063"
                step="1"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminJobs;
