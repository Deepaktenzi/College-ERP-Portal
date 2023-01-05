import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../Student/StudentNavbar';
const StudentAttendance = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [attendence, setAttendence] = useState([]);
  const callAuth = async () => {
    await Axios.get('/api/student/getStudent')
      .then((res) => setStudent(res.data))
      .catch((err) => {
        navigate('/');
        console.log(err);
      });
  };
  useEffect(() => {
    callAuth();
  }, []);

  const callAttendance = async () => {
    const { data } = await Axios.get('/api/student/checkAttendance/', {
      params: {
        student: student._id,
      },
    }).catch((err) => {
      alert(err.message);
    });
    console.log(data.result);
    setAttendence(data.result);
  };
  useEffect(() => {
    callAttendance();
  }, [student]);

  return (
    <>
      <StudentNavbar data={student} />
      <div class="container text-center mt-3">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Subject Code</th>
              <th scope="col">Subject Name</th>
              <th scope="col">Maximum Hours</th>
              <th scope="col">Present Hours</th>
              <th scope="col">Absent Hours</th>
              <th scope="col">Total Hours</th>
              <th scope="col">Attendence</th>
            </tr>
          </thead>
          <tbody>
            {attendence.map((res, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{res.subjectCode}</td>
                <td>{res.subjectName}</td>
                <td>{res.maxHours}</td>
                <td>{res.lectureAttended}</td>
                <td>{res.absentHours}</td>
                <td>{res.totalLectureByFaculty}</td>
                <td>{res.attendence}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentAttendance;
