import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/admin_view/login.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/public_view/public_home.js';
import AdminDashboard from './components/admin_view/admin_dashboard.js'

const App = () => {
  return (
    <div>
      <Router>
      <div>
        <Routes>
          <Route path="/" element={ <Login />}/>
          <Route path="/Home" element={<Home />}/>
          <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        </Routes>
      </div>
    </Router>
    </div>
  )


}

export default App;
