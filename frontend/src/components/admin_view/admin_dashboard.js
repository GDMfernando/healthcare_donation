import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AdminNav from './admin_nav';
import MainDashboard from './main_dashboard';
import HospitalRegistration from './hospital_registration';
import ManageHospitals from './manage_hospitals'

function AdminDashboard(){
    return (
        <div>
        <AdminNav/>
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="1">Register Hospital</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2">Manage Hospitals</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3">Register Campaign</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="4">Manage Campaigns</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="5">View Donations</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                  <Tab.Pane eventKey="0"><MainDashboard/></Tab.Pane>
                    <Tab.Pane eventKey="1"><HospitalRegistration /></Tab.Pane>
                    <Tab.Pane eventKey="2"><ManageHospitals/></Tab.Pane>
                    <Tab.Pane eventKey="3">Second tab content</Tab.Pane>
                    <Tab.Pane eventKey="4">Second tab content</Tab.Pane>
                    <Tab.Pane eventKey="5">Second tab content</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            </div>
      );
}
export default AdminDashboard;