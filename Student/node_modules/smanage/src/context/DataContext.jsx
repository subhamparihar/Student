import React, { createContext, useState, useContext, useEffect } from 'react';
import { mockJobs, mockApplications, mockHoursLogs } from '../data/mockData';

// Create the data context
const DataContext = createContext();

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [hoursLogs, setHoursLogs] = useState([]);

  // Initialize data from mock data
  useEffect(() => {
    setJobs(mockJobs);
    setApplications(mockApplications);
    setHoursLogs(mockHoursLogs);
  }, []);

  // Job management functions
  const addJob = (job) => {
    const newJob = {
      ...job,
      id: String(jobs.length + 1),
      createdAt: new Date().toISOString().split('T')[0],
      applications: [],
    };
    setJobs([...jobs, newJob]);
    return newJob;
  };

  const updateJob = (jobId, updatedData) => {
    setJobs(jobs.map((job) => (job.id === jobId ? { ...job, ...updatedData } : job)));
  };

  const deleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
    setApplications(applications.filter((app) => app.jobId !== jobId));
  };

  const getJobById = (jobId) => jobs.find((job) => job.id === jobId);

  // Application management functions
  const applyForJob = (jobId, studentId, studentName) => {
    const existingApplication = applications.find(
      (app) => app.jobId === jobId && app.studentId === studentId
    );

    if (existingApplication) {
      return { success: false, error: 'You already applied for this job' };
    }

    const newApplication = {
      id: `app-${Math.random().toString(36).substr(2, 9)}`,
      jobId,
      studentId,
      studentName,
      status: 'pending',
      appliedAt: new Date().toISOString().split('T')[0],
      hoursLogged: 0,
      feedback: '',
    };

    setApplications([...applications, newApplication]);

    // Add to job's applications list
    updateJob(jobId, {
      applications: [...(getJobById(jobId)?.applications || []), studentId],
    });

    return { success: true, application: newApplication };
  };

  const approveApplication = (applicationId) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status: 'approved' } : app
      )
    );
  };

  const rejectApplication = (applicationId) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, status: 'rejected' } : app
      )
    );
  };

  const updateApplicationFeedback = (applicationId, feedback) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, feedback } : app
      )
    );
  };

  const getApplicationsByStudency = (studentId) =>
    applications.filter((app) => app.studentId === studentId);

  const getApplicationsByJob = (jobId) =>
    applications.filter((app) => app.jobId === jobId);

  const getApplicationById = (applicationId) =>
    applications.find((app) => app.id === applicationId);

  // Hours log functions
  const logHours = (applicationId, studentId, hours, description) => {
    const newLog = {
      id: `log-${Math.random().toString(36).substr(2, 9)}`,
      applicationId,
      studentId,
      date: new Date().toISOString().split('T')[0],
      hours,
      description,
    };

    setHoursLogs([...hoursLogs, newLog]);

    // Update application hours
    const application = getApplicationById(applicationId);
    if (application) {
      updateApplicationHours(applicationId, application.hoursLogged + hours);
    }

    return newLog;
  };

  const updateApplicationHours = (applicationId, totalHours) => {
    setApplications(
      applications.map((app) =>
        app.id === applicationId ? { ...app, hoursLogged: totalHours } : app
      )
    );
  };

  const getHoursByStudent = (studentId) =>
    hoursLogs.filter((log) => log.studentId === studentId);

  const getHoursByApplication = (applicationId) =>
    hoursLogs.filter((log) => log.applicationId === applicationId);

  const getTotalHoursByStudent = (studentId) => {
    return getHoursByStudent(studentId).reduce((total, log) => total + log.hours, 0);
  };

  const value = {
    // Jobs
    jobs,
    addJob,
    updateJob,
    deleteJob,
    getJobById,

    // Applications
    applications,
    applyForJob,
    approveApplication,
    rejectApplication,
    updateApplicationFeedback,
    getApplicationsByStudency,
    getApplicationsByJob,
    getApplicationById,

    // Hours
    hoursLogs,
    logHours,
    getHoursByStudent,
    getHoursByApplication,
    getTotalHoursByStudent,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use data context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
