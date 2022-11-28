import react, { useState, useEffect } from 'react';
import AdminHome from '../../Components/AdminHome';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';
import AdminNavbar from '../../Components/AdminNavbar';
const AdminGetAllStudent = () => {
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [students, setStudents] = useState(['']);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const getAllStudents = async () => {
    setIsLoading(true);
    const { data } = await axios
      .get('/api/admin/getAllStudents', {
        params: { department, year },
      })
      .catch((err) => {
        console.log(err.response.status);
        console.log(err.response.data);
        setIsLoading(false);
      });
    setStudents(data.result);
    setShow(true);
    setIsLoading(false);
  };

  const showStudent = () => {
    if (!show) {
      return null;
    }
    return (
      <>
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Registration Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Seaction</th>
            </tr>
          </thead>

          <tbody>
            {students.map((std, idx) => {
              return (
                <>
                  <tr key={std.registrationNumber}>
                    <th scope="row">{idx + 1}</th>
                    <td>{std.registrationNumber}</td>
                    <td>{std.name}</td>
                    <td>{std.email}</td>
                    <td>{std.section}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </>
    );
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4">
            <h4>Search For Student</h4>
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
                  onClick={getAllStudents}
                >
                  Search
                </button>
              )}
            </div>
          </div>
          <div className="col-lg">{showStudent()}</div>
        </div>
      </div>
    </>
  );
};

export default AdminGetAllStudent;
