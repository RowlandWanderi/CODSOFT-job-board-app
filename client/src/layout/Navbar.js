import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import '../App.css'

export default function Navbar() {
  const { loggedIn, logout, userType } = useContext(UserContext);

  return (
    <div className='px-4'>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div id='logo' className=''>
            <img src="hfhfh" alt='logo' />
            <Link className="navbar-brand" to={loggedIn ? "/admin" : "/"}>JOBIFY</Link>

          </div >
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
            {loggedIn === false ? (
                  <>
                    <NavLink className="nav-link active" to="/home">Home</NavLink>
                    <NavLink className="nav-link active" to="/login">Login</NavLink>
                    <NavLink className="nav-link active" to="/register">Register</NavLink>
                    <NavLink className="nav-link active" to="/browse_jobs">Browse Jobs</NavLink>
                  </>
                ) : (
                  userType === 'Employer' ? (
                    <>
                      <NavLink className="nav-link active" to="/home">Home</NavLink>
                      <NavLink className="nav-link active" aria-current="page" to="/post_job">Post a Job</NavLink>
                      <NavLink className="nav-link active" aria-current="page" to="/my_jobs">My Jobs</NavLink>
                      <NavLink className="nav-link active" to="/profile">Profile</NavLink>
                      <Link>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                      </Link>
                    </>
                  ) : (
                    <>
                      
                      <NavLink className="nav-link active" to="/home">Home</NavLink>
                      <NavLink className="nav-link active" to="/profile">Profile</NavLink>
                      <NavLink className="nav-link active" to="/browse_jobs">Browse Jobs</NavLink>
                      <NavLink className="nav-link active" to="/my_applications">My Applications</NavLink>
                      <Link>
                        <button className='btn btn-primary' onClick={logout}>Logout</button>
                      </Link>
                    </>
                  )
                )}

            </div>
          </div>
        </div>
      </nav>

    </div>
  );
}