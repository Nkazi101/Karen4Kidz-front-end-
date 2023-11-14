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
            console.log(jobId)
            props.setPickedJobId(response.data.job.id)

        } catch (error) {
            console.error('Error picking up job', error);
        }
    };

    return (
       
        <div className='available-jobs-container' style={{ alignSelf: 'flex-start' }} >
          
            <div className='job-grid'>
                {/* <div className='grid-header'>ID</div> */}
                <div className='grid-header'>HouseHold</div>
                <div className='grid-header'>Pick-Up Address</div>
                <div className='grid-header'>Drop-Off Address</div>
                <div className='grid-header'>Pick-Up Date/Time</div>
                <div className='grid-header'>Actions</div>
                
                {jobs.map(job => (
                    <JobBox key={job.id} job={job} handleJobPickUp={handleJobPickUp} />
                ))}
            </div>
        </div>
    );
}

export default AvailableJobs;
