import React, { useState, useEffect } from 'react';
import AdminHome from '../../Components/AdminHome';
import { MagnifyingGlass } from 'react-loader-spinner';
import axios from 'axios';
function AdminGetAllFaculties() {
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState('');
  const [faculties, setFaculties] = useState(['']);
  const [show, setShow] = useState(false);
  const getAllFaculties = async () => {
    setIsLoading(true);
    const { data } = await axios
      .get('/api/admin/getAllFaculty', {
        params: {
          department,
        },
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err);
        setIsLoading(false);
      });
    setFaculties(data.result);
    setShow(true);
    setIsLoading(false);
  };

  return (
    <>
      <AdminHome />
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <h4>Search For Faculties</h4>
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

            <div className="row justify-content-center">
              {isLoading && <MagnifyingGlass />}
            </div>

            {!isLoading && (
              <button
                className="btn btn-primary w-100 mt-2"
                type="Submit"
                onClick={getAllFaculties}
              >
                Search
              </button>
            )}
          </div>

          <div className="col-lg">
            {show && (
              <table className="table table-striped table-dark">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Registration Number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joining year</th>
                  </tr>
                </thead>

                <tbody>
                  {faculties.map((fac, idx) => {
                    return (
                      <>
                        <tr key={fac.registrationNumber}>
                          <th scope="row">{idx + 1}</th>
                          <td>{fac.registrationNumber}</td>
                          <td>{fac.name}</td>
                          <td>{fac.email}</td>
                          <td>{fac.joiningYear}</td>
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

export default AdminGetAllFaculties;
