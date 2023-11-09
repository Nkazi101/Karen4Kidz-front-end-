import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobBox from '../reusables/JobBox';
import '../../css/reusables/availablejobs.css'; // Make sure the path is correct

function AvailableJobs(props) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await axios.get("http://localhost:8080/availablejob");
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching jobs', error);
            }
        }

        fetchJobs();
    }, []);

    const handleJobPickUp = async (jobId) => {
        try {
            const response = await axios.put(`http://localhost:8080/selectjob/${props.user.id}/${jobId}`);
            setJobs(currentJobs =>
                currentJobs.map(job => (job.id === jobId ? response.data : job))
            );
        } catch (error) {
            console.error('Error picking up job', error);
        }
    };

    return (
       
        <div className='available-jobs-container'>
          
            <div className='table-container'>
                <table>
                
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Pick-Up Address</td>
                            <td>Drop-Off Address</td>
                            <td>Pick-Up Date/Time</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map(job => (
                            
                            <JobBox key={job.id} job={job} handleJobPickUp={handleJobPickUp} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AvailableJobs;
