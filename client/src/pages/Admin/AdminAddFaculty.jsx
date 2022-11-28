import axios from 'axios';
import React, { useState } from 'react';
import AdminHome from '../../Components/AdminHome';
import AdminNavbar from '../../Components/AdminNavbar';

const AdminAddFaculty = () => {
  const [faculty, setFaculty] = useState({
    name: '',
    email: '',
    designation: '',
    department: '',
    facultyMobileNumber: '',
    aadharCard: '',
    dob: '',
    gender: '',
  });

  const inputHandleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFaculty({ ...faculty, [name]: value });
  };

  const postData = async () => {
    const {
      name,
      email,
      designation,
      department,
      facultyMobileNumber,
      aadharCard,
      dob,
      gender,
    } = faculty;
    const res = await axios
      .post('/api/admin/addFaculty', {
        name,
        email,
        designation,
        department,
        facultyMobileNumber,
        aadharCard,
        dob,
        gender,
      })
      .then((res) => {
        if (res.status === 200) {
          window.alert('New Faculty Added');
        }
        setFaculty({
          name: '',
          email: '',
          designation: '',
          department: '',
          facultyMobileNumber: '',
          aadharCard: '',
          dob: '',
          gender: '',
        });
      })
      .catch((err) => {
        window.alert(err.response.status);
        console.log(err.response.data);
      });
  };

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="row justify-content-center">
          <h2 className="text-center mt-4">Add New Faculty</h2>
          <div className="col-sm-4 mt-3">
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="facultyName">
                Faculty Name
              </label>
              <input
                name="name"
                value={faculty.name}
                onChange={inputHandleData}
                className="form-control"
                type="text"
                placeholder="Faculty Name"
              />
            </div>

            <div className="form-group mt-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                value={faculty.email}
                onChange={inputHandleData}
                className="form-control"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="designation">
                Designation
              </label>
              <select
                name="designation"
                value={faculty.designation}
                className="form-select"
                onChange={inputHandleData}
              >
                <option>Select</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Senior Professor">Senior Professor</option>
              </select>
            </div>

            <div className="form-group mt-3">
              <label className="form-label" htmlFor="department">
                Department
              </label>
              <select
                name="department"
                value={faculty.department}
                onChange={inputHandleData}
                className="form-select"
              >
                <option>Select</option>
                <option value="E.C.E">E.C.E</option>
                <option value="C.S.E">C.S.E</option>
                <option value="E.E.E">E.E.E</option>
                <option value="I.T">I.T</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
              </select>
            </div>
          </div>

          <div className="col-sm-4 mt-3">
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="DOB">
                DOB
              </label>
              <input
                name="dob"
                value={faculty.dob}
                onChange={inputHandleData}
                className="form-control"
                type="date"
                placeholder="DOB"
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              <select
                name="gender"
                value={faculty.gender}
                onChange={inputHandleData}
                className="form-select"
              >
                <option>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label className="form-label" htmlFor="contactNumber">
                Contact Number
              </label>
              <input
                name="facultyMobileNumber"
                value={faculty.facultyMobileNumber}
                onChange={inputHandleData}
                className="form-control"
                type="number"
                placeholder="Contact Number"
              />
            </div>

            <div className="form-group mt-3">
              <label className="form-label" htmlFor="Aadhar Card Number">
                Aadhar Card Number
              </label>
              <input
                name="aadharCard"
                value={faculty.aadharCard}
                onChange={inputHandleData}
                className="form-control"
                type="text"
                placeholder="Aadhar Card Number"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={postData}
            className="btn btn-primary mt-3 w-50"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminAddFaculty;
