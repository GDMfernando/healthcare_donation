import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/admin_view/login.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./components/public_view/public_home.js";
import AdminDashboard from "./components/admin_view/admin_dashboard.js";
import HospitalLogin from "./components/hospital_view/hospital_login.js";
import HospitalDashboard from "./components/hospital_view/hospital_dashboard.js";
import HospitalPage from "./components/public_view/hospital_page.js";
import { callAPI } from "./utils/help.js";
import AboutPage from './components/public_view/about.js';
import ContactUsPage from "./components/public_view/contactus.js";
import AllHospitals from "./components/public_view/all_hospitals.js";

const App = () => {
  const [cookie, _] = useCookies(["access_token"]);
  let id = null;
  async function check() {
    id = setInterval(async () => {
      await idle();
    }, 1000 * 60);
  }

  async function idle() {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };

      const response = await callAPI("idle", "GET", fetchOptions);
      if (response.ok) {
        // TO DO
      } else {
        const data = await response.json();
        if (data?.errors) {
          if (data.errors.error_code === "TOKEN_EXPIRED") {
            if (id !== null) {
              localStorage.removeItem("stop");
              clearInterval(id);
              window.location.href = "/admin";
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cookie.access_token) {
      const stop = localStorage.getItem("stop");
      if (stop !== null) {
        check(cookie);
      }
    }

    return () => {
      clearInterval(id);
    };
  }, [cookie]);

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/admin" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/hospital" element={<HospitalLogin />} />
            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            <Route path="/hospital-page" element={<HospitalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/all-hospitals" element={<AllHospitals />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
