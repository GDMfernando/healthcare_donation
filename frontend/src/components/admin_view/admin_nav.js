import React from 'react';
import { Navbar, Container, Nav, Offcanvas} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminNav() {

  const handleLogoClick = () => {
    window.location.reload();
  };

    return ( 
      <div>
        {['md'].map((expand) => (
          <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
            <Container fluid>
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
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Profile</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </div>
    );
  }
  
  export default AdminNav;