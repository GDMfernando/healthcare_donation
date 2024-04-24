import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ManageCampaign from "../admin_view/manage_campaigne";
import RegisterCampaigne from "../admin_view/register_campaign";
import MainDashboard from "../admin_view/main_dashboard";
import ViewDonations from "../admin_view/view_donation";
import HospitalAdminNav from "./hospitaladmin_nav";
import HospitalEditProfile from "./edit_profile";
import { useCookies } from "react-cookie";
import hospitalAdmin from "../../hooks/api/hospitalAdmin/hospitalAdmin";

function HospitalDashboard() {
  const [cookie, _] = useCookies(["access_token"]);
  const [activeTab, setActiveTab] = useState("0");

  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    phone_number: "",
    email: "",
    type: "",
    description: "",
  });

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${cookie.access_token}`,
        };
        const fetchOptions = {
          headers: headers,
        };
        const response = await hospitalAdmin.getHospitalData(fetchOptions);
        if (response !== null && response.success) {
          setHospitalData(response.results);
          setHospitals([
            {
              id: response.results.id,
              name: response.results.name,
              address: response.results.address,
              phone_number: response.results.phone_number,
              email: response.results.email,
              type: response.results.type,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalData();
  }, [activeTab, cookie.access_token]);

  return (
    <div className="admin-dashboard">
      <HospitalAdminNav />
      <Tab.Container
        id="left-tabs-example"
        defaultActiveKey="0"
        onSelect={(k) =>
          k === "1" || k === "2" || k === "3" ? setActiveTab(k) : ""
        }
      >
        <Row className="admin-dashboard">
          <Col sm={3} className="dashboard_sidebar">
            <Nav variant="pills" className="flex-column ">
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="1">
                  Edit Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="2">
                  Register Campaign
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="3">
                  Manage Campaigns
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="ps-5" eventKey="4">
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
                <HospitalEditProfile
                  hospitalData={hospitalData}
                  activeTab={activeTab}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="2">
                <RegisterCampaigne
                  hospitals={hospitals}
                  activeTab={activeTab}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="3">
                <ManageCampaign activeTab={activeTab} />
              </Tab.Pane>
              <Tab.Pane eventKey="4">
                <ViewDonations />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}
export default HospitalDashboard;
