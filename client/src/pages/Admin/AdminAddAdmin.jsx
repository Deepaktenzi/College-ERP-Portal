import React, { useState } from 'react';
import AdminHome from '../../Components/AdminHome';
import axios from 'axios';

const AdminAddAdmin = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    department: '',
    dob: '',
    contactNumber: '',
  });

  let name;
  let value;
  const setInputData = (e) => {
    value = e.target.value;
    name = e.target.name;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, department, dob, contactNumber } = user;
    console.table(user);
    setUser({
      name: '',
      email: '',
      department: '',
      dob: '',
      contactNumber: '',
    });

    const res = await axios
      .post('/api/admin/addAdmin', {
        name,
        email,
        department,
        dob,
        contactNumber,
      })
      .then((res) => res.status)
      .catch((err) => {
        if (err.response.status === 200) {
          window.alert('New Admin Added');
        } else {
          window.alert(err.response.data.message);
        }
      });
    console.log(res.status);
  };
  return (
    <>
      <AdminHome />
      <div className="container">
        <div className="w-50 m-auto mt-4">
          <form>
            <h1 className="text-center mb-4">Add New Admin</h1>
            <div className="row mb-4">
              <div className="col">
                <div className="form-outline">
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={setInputData}
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
              </div>
            </div>

            <div className="form-outline mb-4">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={setInputData}
                placeholder="Email"
                className="form-control"
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="date"
                className="form-control"
                value={user.dob}
                name="dob"
                onChange={setInputData}
              />
            </div>

            <div className="form-outline mb-4">
              <input
                type="number"
                className="form-control"
                value={user.contactNumber}
                name="contactNumber"
                placeholder="Contact Number"
                onChange={setInputData}
              />
            </div>

            <div className="form-outline mb-4">
              <select
                className="form-control"
                name="department"
                value={user.department}
                onChange={setInputData}
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
            <div className="form-outline mb-4">
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 w-100"
                onClick={postData}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminAddAdmin;
