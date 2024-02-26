import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AdminNav from '../admin_view/admin_nav';
import ManageCampaign from '../admin_view/manage_campaigne';
import RegisterCampaigne from '../admin_view/register_campaign';
import MainDashboard from '../admin_view/main_dashboard';
import ViewDonations from '../admin_view/view_donation';

function HospitalDashboard(){
    return (
        <div>
        <AdminNav/>
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column dashboard_sidebar">
                    <Nav.Item>
                      <Nav.Link eventKey="1">Edit Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="2">Register Campaign</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="3">Manage Campaigns</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="4">View Donations</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                  <Tab.Pane eventKey="0"><MainDashboard/></Tab.Pane>
                    <Tab.Pane eventKey="1"></Tab.Pane>
                    <Tab.Pane eventKey="2"><RegisterCampaigne/></Tab.Pane>
                    <Tab.Pane eventKey="3"><ManageCampaign/></Tab.Pane>
                    <Tab.Pane eventKey="4"><ViewDonations/></Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
            </div>
      );
}
export default HospitalDashboard;