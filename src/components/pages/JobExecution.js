import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './GoogleMap';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/reusables/jobexecution.css'


function JobExecution() {
  const [job, setJob] = useState(null);
  const [jobStarted, setJobStarted] = useState(false);

  const { pickedJobId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job details when component mounts
    axios.get(`http://localhost:8080/findJobById/${pickedJobId}`)
      .then(response => setJob(response.data))
      .catch(error => console.error('Error fetching job details', error));
  }, [pickedJobId]);

  const handleStartJob = () => {
    // Call API to update job status to 'In Progress'
    axios.put(`http://localhost:8080/startjob/${pickedJobId}`)
      .then(response => {
        setJob(response.data);
        setJobStarted(true);  
        navigate(`/map/${pickedJobId}`)

      })
      .catch(error => console.error('Error starting job', error));
  };

  if (!job) return <div className="loading">Loading job details...</div>;

  return (
    <div className="job-execution">
    <h1>Job Details</h1>
    <div className="job-info">
      <p><strong>Job Title:</strong> {job.title}</p>
      <p><strong>Pickup Address:</strong> {job.pickUpAddress}</p>
      <p><strong>Dropoff Address:</strong> {job.dropOffAddress}</p>
      <p><strong>Pickup Time:</strong> {job.pickUpDateTime}</p>
      <p><strong>Status:</strong> {job.status}</p>
      {/* Add more details as needed */}
    </div>

    {!jobStarted ? (
      <button className="start-job-btn" onClick={handleStartJob}>Start Job</button>
    ) : (
      <div className="job-map">
        <p>Job started, complete it!</p>
        <GoogleMap job={job} />
      </div>
      )}
    </div>
  );
}

export default JobExecution;
