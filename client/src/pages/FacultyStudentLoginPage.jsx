import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyStudentLoginPage() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({
    registrationNumber: '',
    password: '',
  });
  const facultyInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFaculty({ ...faculty, [name]: value });
  };

  const facultySubmit = async (e) => {
    e.preventDefault();

    const { registrationNumber, password } = faculty;

    const response = await Axios.post(
      '/api/faculty/login',
      {
        registrationNumber,
        password,
      },
      {
        headers: {
          'content-type': 'application/json',
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          navigate('/faculty');
        }
      })
      .catch((err) => {
        window.alert(err.response.data.error);
      });
  };

  return (
    <>
      <div className="container-fluid" id="main-div">
        <div className="login_main">
          <div className="border-2 border border-danger p-2">
            <h3>Faculty Loin</h3>
            <form>
              <label className="form-label">Faculty id</label>
              <input
                onChange={facultyInput}
                name="registrationNumber"
                type="text"
                value={faculty.registrationNumber}
                className="input-group"
              />

              <label className="form-label">Faculty Password</label>
              <input
                onChange={facultyInput}
                name="password"
                type="password"
                value={faculty.password}
                className="input-group"
              />
              <button className="btn btn-primary mt-2" onClick={facultySubmit}>
                LogIn
              </button>
            </form>
          </div>
          <div className="border-2 border border-danger p-2">
            <h3>Student Loin</h3>
            <form>
              <label className="form-label">Student id</label>
              <input type="text" className="input-group" />

              <label className="form-label">Student Password</label>
              <input type="password" className="input-group" />
              <button className="btn btn-primary mt-2">LogIn</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyStudentLoginPage;
