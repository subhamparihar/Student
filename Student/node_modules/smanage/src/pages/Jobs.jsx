import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import JobCard from '../components/JobCard';
import '../styles/pages/jobs.css';

const Jobs = () => {
  const { isAuthenticated, user } = useAuth();
  const { jobs, applyForJob } = useData();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter((job) => job.status === filterStatus);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(term) ||
          job.department.toLowerCase().includes(term) ||
          job.description.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'payRate':
        result = result.sort((a, b) => b.payRate - a.payRate);
        break;
      case 'hours':
        result = result.sort((a, b) => b.hoursPerWeek - a.hoursPerWeek);
        break;
      default:
        break;
    }

    return result;
  }, [jobs, searchTerm, filterStatus, sortBy]);

  const handleApply = (jobId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const result = applyForJob(jobId, user.id, user.name);
    if (result.success) {
      alert('Application submitted successfully!');
      navigate('/student/applications');
    } else {
      alert(result.error);
    }
  };

  return (
    <div className="jobs-page">
      <div className="page-header">
        <h1>Available Work-Study Opportunities</h1>
        <p>Browse and apply for available positions</p>
      </div>

      <div className="page-container">
        {/* Sidebar Filters */}
        <aside className="jobs-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Status</h3>
            <div className="filter-options">
              {['all', 'open', 'closed'].map((status) => (
                <label key={status} className="filter-label">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={filterStatus === status}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  />
                  <span>{status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="payRate">Highest Pay</option>
              <option value="hours">Most Hours</option>
            </select>
          </div>
        </aside>

        {/* Main Content */}
        <main className="jobs-content">
          <div className="results-info">
            <p>{filteredJobs.length} position{filteredJobs.length !== 1 ? 's' : ''} found</p>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="jobs-grid">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={handleApply}
                  actions="view"
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No positions found</h3>
              <p>Try adjusting your search filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Jobs;
