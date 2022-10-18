import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';
import AdminHome from '../../Components/AdminHome';

export default function AdminGetAllSubject() {
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [subjects, setSubjects] = useState(['']);
  const [show, setShow] = useState(false);
  const getAllSubjects = async () => {
    setIsLoading(true);
    const { data } = await axios
      .get('/api/admin/getAllSubject', {
        params: {
          department,
          year,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err);
      });
    setSubjects(data.result);
    setShow(true);
  };

  useEffect(() => {
    if (subjects.length !== 0) {
      setIsLoading(false);
    }
  }, [subjects.length]);

  return (
    <>
      <AdminHome />
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                className="form-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
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
            <div className="form-group mt-2">
              <label htmlFor="Year">Year</label>
              <input
                className="form-control"
                type="number"
                value={year}
                placeholder="Enter the year"
                onChange={(e) => setYear(e.target.value)}
              />
              <div className="row justify-content-center">
                {isLoading && <MagnifyingGlass />}
              </div>

              {!isLoading && (
                <button
                  className="btn btn-primary w-100 mt-2"
                  type="Submit"
                  onClick={getAllSubjects}
                >
                  Search
                </button>
              )}
            </div>
          </div>

          <div className="col-lg">
            {show && (
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Subject Code</th>
                    <th>Subject Name</th>
                    <th>Department</th>
                    <th>Total Lectures</th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((sub, idx) => {
                    return (
                      <>
                        <tr key={idx}>
                          <th scope="row">{idx + 1}</th>
                          <td>{sub.subjectCode}</td>
                          <td>{sub.subjectName}</td>
                          <td>{sub.department}</td>
                          <td>{sub.totalLectures}</td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
