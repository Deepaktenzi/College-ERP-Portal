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
import AdminLogin from './pages/AdminLogin';
import { AdminLogout } from './pages/Admin/AdminLogout';
import FacultyHome from './pages/Faculty/FacultyHome';
import { FacultyUpdateProfile } from './pages/Faculty/FacultyUpdateProfile';
import { FacultyLogout } from './pages/Faculty/FacultyLogout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<FacultyStudentLoginPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin">
          <Route index element={<AdminHome />} />
          <Route path="addAdmin" element={<AdminAddAdmin />} />
          <Route path="allFaculties" element={<AdminGetAllFaculties />} />
          <Route path="allStudents" element={<AdminGetAllStudent />} />
          <Route path="allSubject" element={<AdminGetAllSubject />} />
          <Route path="addFaculty" element={<AdminAddFaculty />} />
          <Route path="addStudent" element={<AdminAddStudent />} />
          <Route path="addSubject" element={<AdminAddSubject />} />
          <Route path="logout" element={<AdminLogout />} />
        </Route>
        <Route path="/faculty/">
          <Route index element={<FacultyHome />} />
          <Route path="updateProfile" element={<FacultyUpdateProfile />} />
          <Route path="logout" element={<FacultyLogout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
