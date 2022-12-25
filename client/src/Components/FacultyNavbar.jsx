import React from 'react';
import { Link } from 'react-router-dom';

const FacultyNavbar = (props) => {
  return (
    <>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <h4 className="navbar-brand mt-1">SRM</h4>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <button type="button" className="btn">
                  <Link to="/faculty">
                    <li>{props.data.name}</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/faculty/updateProfile">
                    <li>Update Profile</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addStudent">
                    <li>Mark Attendance</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addSubject">
                    <li>Upload Marks</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addAdmin">
                    <li>Update Password</li>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button style={{ listStyle: 'None' }} type="button" className="btn">
              <Link to="/faculty/logout">
                <li>LogOut</li>
              </Link>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default FacultyNavbar;
