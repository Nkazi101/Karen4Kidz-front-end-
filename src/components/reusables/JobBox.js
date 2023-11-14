import React from 'react';
import '../../css/pages/availablejobs.css';

function JobBox({ job, handleJobPickUp }) {
    return (
        <>
            <div className='grid-cell'>{job.child && job.child.lastName}</div>
            <div className='grid-cell'>{job.pickUpAddress}</div>
            <div className='grid-cell'>{job.dropoffAddress}</div>
            <div className='grid-cell'>{job.pickUpTime}</div>
            
            <div className='grid-cell'>
                <button className="pickup-btn" onClick={() => handleJobPickUp(job.id)}>
                    Pick Up
                </button>
            </div>
        </>
    );
}

export default JobBox;
