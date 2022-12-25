import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FacultyNavbar from '../../Components/FacultyNavbar';

const FacultyUpdateProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState('');
  const [faculty, setFaculty] = useState({});
  const callFacHomePage = async () => {
    const response = await Axios.get('/api/faculty/getdata')
      .then((res) => setData(res.data))
      .catch((err) => {
        navigate('/');
        console.log(err);
      });
  };

  useEffect(() => {
    callFacHomePage();
  }, []);

  const handleInputs = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('avatar', avatar);
    formdata.append('email', data.email);
    formdata.append('gender', faculty.gender);
    formdata.append('contactno', faculty.contactno);
    formdata.append('aadhar', faculty.aadhar);
    const res = await Axios.post('/api/faculty/updateFaculty', formdata).then(
      (res) => {
        console.log(res.data);
        alert('Reload The Page');
      }
    );
  };

  return (
    <>
      <FacultyNavbar data={data} />
      <div className="container-fluid vh-100 d-flex justify-content-center mt-5">
        <form className="form">
          <div className="form-group">
            <label className="form-label">Upload Image</label>
            <input
              className="form-control"
              type="file"
              name="avatar"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender</label>
            <input
              className="form-control"
              type="input"
              name="gender"
              value={faculty.gender}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input
              className="form-control"
              type="number"
              name="contactno"
              value={faculty.contactno}
              onChange={handleInputs}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Aadhar</label>
            <input
              className="form-control"
              type="number"
              name="aadhar"
              value={faculty.aadhar}
              onChange={handleInputs}
            />
          </div>
          <input
            type="button"
            className="btn btn-danger w-100 mt-2"
            value="submit"
            onClick={onSubmit}
          />
        </form>
      </div>
    </>
  );
};
export default FacultyUpdateProfile;
