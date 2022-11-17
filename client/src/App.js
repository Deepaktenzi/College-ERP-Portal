import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './Components/AdminHome';
import AdminAddAdmin from './pages/Admin/AdminAddAdmin';
import AdminGetAllFaculties from './pages/Admin/AdminGetAllFaculties';
import AdminGetAllStudent from './pages/Admin/AdminGetAllStudent';
import AdminGetAllSubject from './pages/Admin/AdminGetAllSubject';
import AdminAddSubject from './pages/Admin/AdminAddSubject';
import AdminAddStudent from './pages/Admin/AdminAddStudent';
import AdminAddFaculty from './pages/Admin/AdminAddFaculty';
import FacultyStudentLoginPage from './pages/FacultyStudentLoginPage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<FacultyStudentLoginPage />} />
        <Route exact path="/admin" element={<AdminHome />} />
        <Route exact path="/admin/addAdmin" element={<AdminAddAdmin />} />
        <Route
          exact
          path="/admin/allFaculties"
          element={<AdminGetAllFaculties />}
        />
        <Route
          exact
          path="/admin/allStudents"
          element={<AdminGetAllStudent />}
        />
        <Route
          exact
          path="/admin/allSubject"
          element={<AdminGetAllSubject />}
        />
        <Route exact path="/admin/addStudent" element={<AdminAddStudent />} />
        <Route exact path="/admin/addFaculty" element={<AdminAddFaculty />} />
        <Route exact path="/admin/addSubject" element={<AdminAddSubject />} />
      </Routes>
    </>
  );
}

export default App;
