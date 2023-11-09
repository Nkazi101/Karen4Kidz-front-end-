import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMap from './GoogleMap';
import { useParams } from 'react-router-dom';

function JobExecution({}) {
  const [job, setJob] = useState(null);
  const [jobStarted, setJobStarted] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    // Fetch job details when component mounts
    axios.get(`http://localhost:8080/findJobById/${id}`)
      .then(response => setJob(response.data))
      .catch(error => console.error('Error fetching job details', error));
  }, [id]);

  const handleStartJob = () => {
    // Call API to update job status to 'In Progress'
    axios.put(`http://localhost:8080/startjob/${id}`)
      .then(response => {
        setJob(response.data);
        setJobStarted(true);   
      })
      .catch(error => console.error('Error starting job', error));
  };

  if (!job) return <div>Loading job details...</div>;

  return (
    <div>
    <div>Job: {job.title}</div>
    <div>{job.pickUpAddress}</div>
    <div>{job.dropOffAddress}</div>
    <div>{job.pickUpDateTime}</div>
    
      {!jobStarted ? (
        <button onClick={handleStartJob}>Start Job</button>
      ) : (
        <div>
          <p>Job started, complete it!</p>
          
          <GoogleMap job={job} />
        </div>
      )}
    </div>
  );
}

export default JobExecution;
