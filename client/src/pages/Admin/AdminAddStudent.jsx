import Axios from 'axios';
import React, { useState } from 'react';
import AdminNavbar from '../../Components/AdminNavbar';

function AdminAddStudent() {
  const [student, setStudent] = useState({});
  const handleData = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      year,
      fatherName,
      aadharCard,
      gender,
      department,
      section,
      dob,
      studentMobileNumber,
      fatherMobileNumber,
    } = student;
    await Axios.post('/api/admin/addStudent', {
      name,
      email,
      year,
      fatherName,
      aadharCard,
      gender,
      department,
      section,
      dob,
      studentMobileNumber,
      fatherMobileNumber,
    })
      .then((res) => {
        alert(res.data.message);
        setStudent({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <AdminNavbar />

      <div className="addStu_main">
        <form className="w-50 m-5">
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label className="form-label" htmlFor="name">
                  Student Name
                </label>
                <input
                  name="name"
                  onChange={handleData}
                  value={student.name}
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Name..."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email
                </label>
                <input
                  name="email"
                  onChange={handleData}
                  value={student.email}
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email..."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="inputState">
                  Year
                </label>
                <select
                  name="year"
                  id="inputState"
                  className="form-control"
                  onChange={handleData}
                  value={student.year}
                >
                  <option>Choose...</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="aadharCard">
                  AadharCard
                </label>
                <input
                  name="aadharCard"
                  onChange={handleData}
                  value={student.aadharCard}
                  type="text"
                  className="form-control"
                  id="aadharCard"
                  placeholder="AadharCard.."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="DOB">
                  DOB
                </label>
                <input
                  name="dob"
                  onChange={handleData}
                  value={student.dob}
                  type="date"
                  className="form-control"
                  id="date"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="studentMobileNumber">
                  Student Mobile Number
                </label>
                <input
                  name="studentMobileNumber"
                  onChange={handleData}
                  value={student.studentMobileNumber}
                  type="number"
                  className="form-control"
                  id="studentMobileNumber"
                  placeholder="Student Mobile Number.."
                />
              </div>
            </div>

            {/* Col Two */}
            <div className="col">
              <div className="form-group">
                <label className="form-label" htmlFor="fatherName">
                  fatherName
                </label>
                <input
                  name="fatherName"
                  onChange={handleData}
                  value={student.fatherName}
                  type="text"
                  className="form-control"
                  id="fatherName"
                  placeholder="Father Name.."
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="inputState">
                  Gender
                </label>
                <select
                  name="gender"
                  id="inputState"
                  className="form-control"
                  onChange={handleData}
                  value={student.gender}
                >
                  <option>Choose...</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="inputState">
                  Department
                </label>
                <select
                  name="department"
                  id="inputState"
                  className="form-control"
                  onChange={handleData}
                  value={student.department}
                >
                  <option>Choose...</option>
                  <option>C.S.E</option>
                  <option>E.S.E</option>
                  <option>I.T</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="inputState">
                  Section
                </label>
                <select
                  name="section"
                  id="inputState"
                  className="form-control"
                  onChange={handleData}
                  value={student.section}
                >
                  <option>Choose...</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="fatherMobileNumber">
                  Father Mobile Number
                </label>
                <input
                  name="fatherMobileNumber"
                  onChange={handleData}
                  value={student.fatherMobileNumber}
                  type="number"
                  className="form-control"
                  id="fatherMobileNumber"
                  placeholder="Father Mobile Number.."
                />
              </div>
            </div>
          </div>
          <button className="btn btn-danger w-50 mt-3" onClick={postData}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminAddStudent;
