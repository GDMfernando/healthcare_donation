import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/admin_view/login.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/public_view/public_home.js';
import AdminDashboard from './components/admin_view/admin_dashboard.js'
import HospitalLogin from './components/hospital_view/hospital_login.js';
import HospitalDashboard from './components/hospital_view/hospital_dashboard.js';
import HospitalPage from './components/public_view/hospital_page.js';

const App = () => {
  return (
    <div>
      <Router>
      <div>
        <Routes>
          <Route path="/admin" element={ <Login />}/>
          <Route path="/" element={<Home />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
          <Route path="/hospital" element={<HospitalLogin />}/>
          <Route path="/hospital-dashboard" element={<HospitalDashboard />}/>
          <Route path="/hospital-page" element={<HospitalPage />}/>
        </Routes>
      </div>
    </Router>
    </div>
  )


}

export default App;
