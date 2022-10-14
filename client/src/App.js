import './App.css';
import { Route, Routes } from 'react-router-dom';
import AdminHome from './Components/AdminHome';
import AdminAddAdmin from './pages/AdminAddAdmin';
import AdminGetAllStudent from './pages/AdminGetAllStudent';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<AdminHome />} />
        <Route exact path="/admin/addAdmin" element={<AdminAddAdmin />} />
        <Route
          exact
          path="/admin/allStudents"
          element={<AdminGetAllStudent />}
        />
      </Routes>
    </>
  );
}

export default App;
