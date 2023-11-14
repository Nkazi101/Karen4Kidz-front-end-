import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../css/reusables/header.css";

function Header(props, pickedJobId) {

    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("userId");
        props.setUser({ id: undefined, firstName: "", lastName: "", email: "", password: "", isAdmin: false });
        navigate("/");
    };

    return (
        <header className='header'>
            <div className="header-content">
                <Link to="/" className="logo">Logo</Link>
                <nav className="navigation">
                    {props.user.id !== undefined ? (
                        <>
                            <Link to="/">Home</Link>
                            {props.user.isAdmin ? (
                                <>
                                    <Link to="/createjob">Add Job</Link>
                                    <Link to="/userjobs">View Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/selectjob">Select Job</Link>
                                    <Link to={`/manage-children/${props.user.id}`}>Manage Children</Link>
                                    <Link to="/userjobs">My Jobs</Link>
                                    {/* Assuming '/profile' and '/trackjob' are paths you will implement */}
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/trackjob">Tracking</Link>
                                </>
                            )}
                            <div className="nav-item" onClick={signOut}>Sign Out</div>
                        </>
                    ) : (
                        <>
                            <Link to="/signup">Sign Up</Link>
                            <Link to="/signin">Sign In</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
