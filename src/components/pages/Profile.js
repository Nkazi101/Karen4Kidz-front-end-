import React from 'react';

function Profile(props) {
    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <div>
                <p>First Name: {props.user.firstName}</p>
                <p>Last Name: {props.user.lastName}</p>
                <p>Email: {props.user.email}</p>
                
            </div>
        </div>
    );
}

export default Profile;
