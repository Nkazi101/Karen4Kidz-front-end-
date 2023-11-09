import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JobBox from '../reusables/JobBox';

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
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Pick-Up Address</th>
                            <th>Drop-Off Address</th>
                            <th>Pick-Up Date/Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(jobs) && jobs.map(job => (
                            <JobBox key={job.id} job={job} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserJobs;