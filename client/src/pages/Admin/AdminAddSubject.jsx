import axios from 'axios';
import React, { useState } from 'react';
import AdminHome from '../../Components/AdminHome';

function AdminAddSubject() {
  const [subject, setSubject] = useState({
    totalLectures: '',
    department: '',
    subjectCode: '',
    subjectName: '',
    year: '',
  });

  const handleInputData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setSubject({ ...subject, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { totalLectures, department, subjectCode, subjectName, year } =
      subject;
    console.table(subject);
    const res = await axios
      .post('/api/admin/addSubject', {
        department,
        subjectCode,
        subjectName,
        totalLectures,
        year,
      })
      .then((res) => {
        if (res.status === 200) {
          window.alert('New Subject Added');
        }
      })
      .catch((err) => {
        window.alert(err.message);
        console.log(err);
      });
    setSubject({});
  };
  return (
    <>
      <AdminHome />
      <div className="cotainer">
        <div className="row justify-content-center">
          <div className="col-sm-3 m-3 ">
            <h3 className="text-center">Add Subject</h3>
            <form onSubmit={postData}>
              <div className="form-group mt-3">
                <label className="form-label" htmlFor="Subject Name">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subjectName"
                  onChange={handleInputData}
                  value={subject.subjectName}
                  placeholder="Subject Name"
                  className="form-control"
                />
              </div>
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="Subject Code">
                  Subject Code
                </label>
                <input
                  type="text"
                  name="subjectCode"
                  onChange={handleInputData}
                  value={subject.subjectCode}
                  placeholder="Subject Code"
                  className="form-control"
                />
              </div>
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="department">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  onChange={handleInputData}
                  value={subject.department}
                  placeholder="Department"
                  className="form-control"
                />
              </div>
              <div className="form-group mt-2">
                <label className="form-label" htmlFor="year">
                  Year
                </label>
                <input
                  type="number"
                  name="year"
                  onChange={handleInputData}
                  value={subject.year}
                  placeholder="Year"
                  className="form-control"
                />
              </div>
              <div className="form-group mt-3">
                <label className="form-label" htmlFor="totalLectures">
                  Total Lectures
                </label>
                <input
                  type="number"
                  name="totalLectures"
                  onChange={handleInputData}
                  value={subject.totalLectures}
                  placeholder="Total Lectures"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminAddSubject;
