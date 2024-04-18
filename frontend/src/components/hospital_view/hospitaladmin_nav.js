import React from 'react';
import { Navbar, Container, Nav, Offcanvas, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

function HospitalAdminNav() {

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid className='px-5'>
            <Navbar.Brand as={Link} to="/admin-dashboard" onClick={handleLogoClick}><img
              src="/images/logo.svg"
              alt="Logo"
              width="160"
              height="40"
              className="d-inline-block align-top"
            /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                
                <Nav className="justify-content-end flex-grow-1">
                <Dropdown className='admin-profile-dropdown' >
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FaUser></FaUser>
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item href="/hospital">Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}

export default  HospitalAdminNav;