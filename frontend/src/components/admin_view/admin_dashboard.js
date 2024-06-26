import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import AdminNav from "./admin_nav";
import MainDashboard from "./main_dashboard";
import HospitalRegistration from "./hospital_registration";
import ManageHospitals from "./manage_hospitals";
import RegisterCampaigne from "./register_campaign";
import ManageCampaign from "./manage_campaigne";
import ViewDonations from "./view_donation";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("0"); // State to keep track of active tab
  const [hospitals, setHospitals] = useState([]);
  const [cookie, _] = useCookies(["access_token"]);

  const getAll = async () => {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI("hospital/all", "GET", fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setHospitals(data.results);
      } else {
        console.log("Error fetching hospitals data");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTabSelect = async (eventKey) => {
    if (eventKey === "3" || eventKey === "4") {
      await getAll();
    }
    setActiveTab(eventKey);
  };

  return (
    <div className="admin-dashboard">
      <AdminNav />
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="0"
        activeKey={activeTab}
        onSelect={handleTabSelect}
      >
        <Row className="admin-dashboard">
          <Col sm={3} className="dashboard_sidebar">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="1">
                  Register Hospital
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="2">
                  Manage Hospitals
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="3">
                  Register Campaign
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="4">
                  Manage Campaigns
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="5">
                  View Donations
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9} className="p-0">
            <Tab.Content className="p-4">
              <Tab.Pane eventKey="0">
                <MainDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="1">
                <HospitalRegistration />
              </Tab.Pane>
              <Tab.Pane eventKey="2">
                <ManageHospitals activeTab={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="3">
                <RegisterCampaigne hospitals={hospitals} />
              </Tab.Pane>
              <Tab.Pane eventKey="4">
                <ManageCampaign activeTab={activeTab} hospitals={hospitals} />
              </Tab.Pane>
              <Tab.Pane eventKey="5">
                <ViewDonations activeTab={activeTab} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
export default AdminDashboard;
