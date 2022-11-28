import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';
import AdminNavbar from './AdminNavbar';

const cookies = new Cookies();

function AdminHome() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const callhomePage = async () => {
    const admin = await Axios.get('/api/admin/getdata')
      .then((res) => setData(res.data))
      .catch((err) => {
        navigate('/adminlogin');
        console.log(err);
      });
  };

  useEffect(() => {
    callhomePage();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-2"></div>
          <div className="col-8">
            <div className="row">
              <div className="col-md-5">
                <div className="card" style={{ width: '18rem' }}>
                  <img
                    className="card-img-top"
                    src={data.avatar}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <h5 className="card-title">{data.registrationNumber}</h5>
                    {/* <Link to='/faculty/updateProfile'>UPDATE PROFILE</Link> */}
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
                      <td>Joining Year</td>
                      <td>{data.joiningYear}</td>
                    </tr>
                    <tr>
                      <td>Department</td>
                      <td>{data.department}</td>
                    </tr>
                    <tr>
                      <td>Contact Number</td>
                      <td>{data.contactNumber ? data.contactNumber : 'NA'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
