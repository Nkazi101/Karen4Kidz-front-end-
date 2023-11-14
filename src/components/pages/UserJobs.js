import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserJobBox from '../reusables/UserJobBox';

function UserJobs(props) {
    const [jobs, setJobs] = useState([]);
    const [status, setStatus] = useState('PENDING'); // Start with 'PENDING'

    useEffect(() => {
        async function fetchUserJobs() {
            try {
                const response = await axios.get(`http://localhost:8080/jobstatus/${props.user.id}/${status}`);
                setJobs(response.data);
            } catch (error) {
                console.error('Error fetching user jobs', error);
            }
        }

        if (props.user && props.user.id) {
            fetchUserJobs();
        }
    }, [props.user, status]);

     

    return (
        <div className='user-jobs-container'>
            
            <div>
                
                <select onChange={(e) => setStatus(e.target.value)} value={status}>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select>
            </div>
            <div className='available-jobs-container' style={{ alignSelf: 'flex-start' }} >
            <div className='job-grid'>
                {/* <div className='grid-header'>ID</div> */}
                <div className='grid-header'>HouseHold</div>
                <div className='grid-header'>Pick-Up Address</div>
                <div className='grid-header'>Drop-Off Address</div>
                <div className='grid-header'>Pick-Up Date/Time</div>
                <div className='grid-header'>Actions</div>
                
                        {Array.isArray(jobs) && jobs.map(job => (
                            <UserJobBox key={job.id} job={job} />
                        ))}
                   </div>
        </div>
        </div>
    );
}

export default UserJobs;