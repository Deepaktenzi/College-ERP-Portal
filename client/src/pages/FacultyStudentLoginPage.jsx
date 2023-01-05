import Axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FacultyStudentLoginPage() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [faculty, setFaculty] = useState({
    registrationNumber: '',
    password: '',
  });

  // Faculty Inputs
  const facultyInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFaculty({ ...faculty, [name]: value });
  };

  // Faculty Submit
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

  // Studnet Inputs
  const studentInput = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const studentSubmit = async (e) => {
    e.preventDefault();
    const { registrationNumber, password } = student;
    await Axios.post('/api/student/login', {
      registrationNumber,
      password,
    })
      .then((req) => {
        console.log(req.data);
        if (req.status === 200) {
          navigate('/student');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="content">
        <div className="container-fluid" id="main-div">
          <div className="login_main">
            <div className="p-2">
              <h3>Faculty Login</h3>
              <form>
                <div className="form-group">
                  <label className="form-label fw-bold">Faculty id</label>
                  <input
                    onChange={facultyInput}
                    name="registrationNumber"
                    type="text"
                    value={faculty.registrationNumber}
                    className="form-control"
                  />

                  <label className="form-label fw-bold">Faculty Password</label>
                  <input
                    onChange={facultyInput}
                    name="password"
                    type="password"
                    value={faculty.password}
                    className="form-control"
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={facultySubmit}
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
            <div className="p-2">
              <h3>Student Login</h3>
              <form>
                <div className="form-group">
                  <label className="form-label fw-bold">Student id</label>
                  <input
                    name="registrationNumber"
                    value={student.registrationNumber}
                    type="text"
                    className="form-control "
                    onChange={studentInput}
                  />

                  <label className="form-label fw-bold">Student Password</label>
                  <input
                    name="password"
                    value={student.password}
                    type="password"
                    className="form-control"
                    onChange={studentInput}
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={studentSubmit}
                  >
                    LogIn
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FacultyStudentLoginPage;
