import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import Axios from 'axios';

function AdminNavbar() {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    const callhomePage = async () => {
      const admin = await Axios.get('/api/admin/getdata')
        .then((res) => setData(res.data))
        .catch((err) => {
          navigate('/adminlogin');
          console.log(err);
        });
    };
    callhomePage();
  }, []);

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
                  <Link to="/admin">
                    <li>{data.name}</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addFaculty">
                    <li>ADD FACULTY</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addStudent">
                    <li>ADD STUDENT</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addSubject">
                    <li>ADD SUBJECT</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/addAdmin">
                    <li>ADD ADMIN</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/allFaculties">
                    <li>OUR FACULTIES</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/allStudents">
                    <li>OUR STUDENTS</li>
                  </Link>
                </button>
              </li>
              <li className="nav-item">
                <button type="button" className="btn">
                  <Link to="/admin/allSubject">
                    <li>SUBJECTS</li>
                  </Link>
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button style={{ listStyle: 'None' }} type="button" className="btn">
              <Link to="/admin/logout">
                <li>LogOut</li>
              </Link>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default AdminNavbar;
