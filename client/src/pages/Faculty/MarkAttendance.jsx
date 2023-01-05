import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultyNavbar from '../../Components/FacultyNavbar';
import Axios from 'axios';
const MarkAttendance = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState(['']);
  const [department, setDepartment] = useState('');
  const [subjects, setSubjects] = useState(['']);
  const [year, setYear] = useState('');
  const [section, setSection] = useState('');
  const [checkValue, setCheckValue] = useState([]);
  const [subjectCode, setSubjectCode] = useState('');
  const callFacHomePage = async () => {
    const faculty = await Axios.get('/api/faculty/getdata')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        navigate('/');
        console.log(err);
      });
  };

  useEffect(() => {
    callFacHomePage();
  }, []);

  const searchData = async (e) => {
    e.preventDefault();
    setShow(true);
    const { data } = await Axios.get('/api/faculty/allStudents', {
      params: { department, year, section },
    }).catch((error) => {
      console.log(error);
    });

    setStudents(data.result);
    setSubjects(data.subjects);
  };

  const handleInputChange = (e) => {
    const tempCheck = checkValue;
    let index;

    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckValue(tempCheck);
    console.log(tempCheck);
    console.log('The Value of Check values' + checkValue);
  };

  const postData = async (e) => {
    e.preventDefault();
    await Axios.post('/api/faculty/markAttendance/', {
      checkValue,
      subjectCode,
      department,
      year,
      section,
    })
      .then((res) => {
        if (res.status === 200) {
          alert('Attendance Marked');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <FacultyNavbar data={data} />
      <div class="container text-center ">
        <div className="row">
          <div className="col-3">
            <form>
              <div className="form-group">
                <label htmlFor="department">Depatment</label>
                <select
                  className="form-control"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Choose..</option>
                  {<option value="C.S.E">C.S.E</option>}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="yearid">
                  Year
                </label>
                <select
                  className="form-control"
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="">Choose..</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="department">Section</label>
                <select
                  className="form-control"
                  onChange={(e) => setSection(e.target.value)}
                >
                  <option>Choose..</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div>
              <button className="btn btn-danger mt-2" onClick={searchData}>
                Search
              </button>
            </form>
          </div>

          {/* Second Form */}
          <div className="col-5">
            {show && (
              <form>
                <div className="form-group">
                  <label htmlFor="SubjectCode" className="form-label">
                    Subject Code
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => setSubjectCode(e.target.value)}
                  >
                    <option>Options..</option>
                    {subjects.map((val, indx) => {
                      return (
                        <option key={indx} value={val.subjectCode}>
                          {val.subjectCode}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <table className="table table-dark mt-2">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Registation Number</th>
                      <th>Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((obj, index) => {
                      return (
                        <tr>
                          <td>
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={obj._id}
                                onChange={handleInputChange}
                                id="defaultCheck1"
                              />
                            </div>
                          </td>
                          <td key={index}>{obj.registrationNumber}</td>
                          <td>{obj.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <button className="btn btn-danger" onClick={postData}>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MarkAttendance;
