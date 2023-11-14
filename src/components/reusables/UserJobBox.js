import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/pages/availablejobs.css';

function UserJobBox({ job }) {
    const navigate = useNavigate();

    const handleExecuteClick = () => {
        navigate(`/job/${job.id}`);
    };

    const handleViewMapClick = () => {
        navigate(`/map/${job.id}`);
    };
    

    return (
        <>
            <div className='grid-cell'>{job.child && job.child.lastName}</div>
            <div className='grid-cell'>{job.pickUpAddress}</div>
            <div className='grid-cell'>{job.dropoffAddress}</div>
            <div className='grid-cell'>{job.pickUpTime}</div>
            
            <div className='grid-cell'>
                {job.status === 'PENDING' && (
                    <button className="execute-btn" onClick={handleExecuteClick}>
                        Execute
                    </button>
                )}
                {job.status === 'IN_PROGRESS' && (
                    <button className="view-map-btn" onClick={handleViewMapClick}>
                        View Map
                    </button>
                )}
            </div>
        </>
    );
}

export default UserJobBox;
