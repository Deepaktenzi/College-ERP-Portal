import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({
    registrationNumber: '',
    password: '',
  });
  const [data, setData] = useState();

  const HandleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAdmin({ ...admin, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { registrationNumber, password } = admin;

    await axios
      .post(
        '/api/admin/login',
        {
          registrationNumber,
          password,
        },
        {
          withCredentials: true,
          headers: {
            'content-type': 'application/json',
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          navigate('/admin');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container-fluid" id="main-div">
        <div className="login_main">
          <div className="border-2 border border-danger p-2">
            <h3>{data}</h3>
            <form onSubmit={postData}>
              <label className="form-label">Admin id</label>
              <input
                type="text"
                name="registrationNumber"
                value={admin.registrationNumber}
                className="input-group"
                onChange={HandleInput}
              />

              <label className="form-label">Admin Password</label>
              <input
                type="password"
                className="input-group"
                name="password"
                value={admin.password}
                onChange={HandleInput}
              />
              <button className="btn btn-primary mt-2">LogIn</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
