import React from 'react';
import '../../css/pages/availablejobs.css';

function JobBox({ job, handleJobPickUp }) {
    return (

        <tr className='job-box'>
            <td>{job.id}</td>
            <td>{job.pickUpAddress}</td>
            <td>{job.dropOffAddress}</td>
            <td>{job.pickUpDateTime}</td>
            
                <button className="pickup-btn" onClick={() => handleJobPickUp(job.id)}>
                    Pick Up
                </button>
            
        </tr>
       
    );
}

export default JobBox;
