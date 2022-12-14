import React, { useState, useEffect } from 'react';
import FacultyNavbar from '../../Components/FacultyNavbar';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
const FacultyHome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [imagePath, setImagePath] = useState('');

  const callFacHomePage = async () => {
    const faculty = await Axios.get('/api/faculty/getdata')
      .then((res) => {
        setData(res.data);
        setImagePath('http://localhost:3000/public/uploads/' + data.avatar);
      })
      .catch((err) => {
        navigate('/');
        console.log(err);
      });
  };

  useEffect(() => {
    callFacHomePage();
  }, [imagePath]);

  return (
    <>
      <FacultyNavbar data={data} />
      {data ? (
        <div className="container">
          <div className="row mt-5">
            <div className="col-2"></div>
            <div className="col-8">
              <div className="row">
                <div className="col-md-5">
                  <div className="card" style={{ width: '18rem' }}>
                    <img
                      className="card-img-top"
                      src={imagePath}
                      alt="Card Img"
                    />

                    <div className="card-body">
                      <h5 className="card-title">{data.name}</h5>
                      <h5 className="card-title">{data.registrationNumber}</h5>
                      <Link to="/faculty/updateProfile">UPDATE PROFILE</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-7">
                  <table className="table border">
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{data.name}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{data.email}</td>
                      </tr>
                      <tr>
                        <td>Registration Number</td>
                        <td>{data.registrationNumber}</td>
                      </tr>
                      <tr>
                        <td>Designation</td>
                        <td>{data.designation}</td>
                      </tr>
                      <tr>
                        <td>Department</td>
                        <td>{data.department}</td>
                      </tr>
                      <tr>
                        <td>Date Of Birth</td>
                        <td>{data.dob}</td>
                      </tr>
                      <tr>
                        <td>Gender</td>
                        <td>{data.gender}</td>
                      </tr>
                      <tr>
                        <td>Joining Year</td>
                        <td>{data.joiningYear}</td>
                      </tr>

                      <tr>
                        <td>Contact Number</td>
                        <td>
                          {data.facultyMobileNumber
                            ? data.facultyMobileNumber
                            : 'NA'}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      ) : (
        navigate('/')
      )}
    </>
  );
};

export default FacultyHome;
