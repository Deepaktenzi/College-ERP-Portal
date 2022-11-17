import React from 'react';

function FacultyStudentLoginPage() {
  return (
    <>
      <div className="container-fluid">
        <div className="login_main">
          <div className="border-2 border border-danger p-2">
            <h3>Faculty Loin</h3>
            <form>
              <label className="form-label">Faculty id</label>
              <input type="text" className="input-group" />

              <label className="form-label">Faculty Password</label>
              <input type="password" className="input-group" />
              <button className="btn btn-primary mt-2">LogIn</button>
            </form>
          </div>
          <div className="border-2 border border-danger p-2">
            <h3>Student Loin</h3>
            <form>
              <label className="form-label">Faculty id</label>
              <input type="text" className="input-group" />

              <label className="form-label">Faculty Password</label>
              <input type="password" className="input-group" />
              <button className="btn btn-primary mt-2">LogIn</button>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-sm-4">
            <h2>Faculty Login</h2>
          </div>
          <div className="col-sm-4">
            <h2>Faculty Login</h2>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default FacultyStudentLoginPage;
