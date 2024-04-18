import React from 'react';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ManageCampaign from '../admin_view/manage_campaigne';
import RegisterCampaigne from '../admin_view/register_campaign';
import MainDashboard from '../admin_view/main_dashboard';
import ViewDonations from '../admin_view/view_donation';
import HospitalAdminNav from './hospitaladmin_nav';
import HospitalEditProfile from './edit_profile';

function HospitalDashboard(){
    return (
        <div className="admin-dashboard">
        <HospitalAdminNav></HospitalAdminNav>
        <Tab.Container id="left-tabs-example" defaultActiveKey="0">
              <Row className="admin-dashboard">
                <Col sm={3} className='dashboard_sidebar'>
                  <Nav variant="pills" className="flex-column ">
                    <Nav.Item>
                      <Nav.Link className="ps-5" eventKey="1">Edit Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="ps-5" eventKey="2">Register Campaign</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="ps-5" eventKey="3">Manage Campaigns</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="ps-5" eventKey="4">View Donations</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9} className="p-0">
                  <Tab.Content className="p-4">
                  <Tab.Pane eventKey="0"><MainDashboard/></Tab.Pane>
                    <Tab.Pane eventKey="1"><HospitalEditProfile></HospitalEditProfile></Tab.Pane>
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