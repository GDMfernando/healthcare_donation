import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { callAPI } from '../../utils/help';

function NavBar() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await callAPI('hospital/public/all', 'GET'); // Use callAPI to fetch hospitals
        if (response.ok) {
          const data = await response.json();
          setHospitals(data.results); // Assuming data.results is an array of hospitals
        } else {
          console.log('Error fetching hospitals data');
        }
      } catch (error) {
        console.error('Error fetching hospitals data:', error);
      }
    };

    fetchHospitals();
  }, []);

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleContactClick = () => {
    navigate('/contactus');
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    // Ensure hospital is an object with expected properties
    return hospital && typeof hospital === 'object' && hospital.id && hospital.name &&
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDonateButtonClick = async (hospitalId) => {
    try {
      console.log(hospitalId)
      const response = await callAPI(`hospital/public/get/${hospitalId}`, 'GET');
      if (response.ok) {
        const hospitalData = await response.json();
        console.log(hospitalData)
        // const hospitalName = hospitalData.name;
        // navigate(`/hospital-page/${hospitalId}`);
        navigate(`/hospital-page/${hospitalId}`, { state: { hospitalData } });
      } else {
        console.error('Failed to fetch hospital data');
      }
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  return (
    <>
      <Navbar expand="md" className="bg-body-tertiary mb-3">
        <Container fluid className="px-5">
          <Navbar.Brand as={Link} to="/" onClick={handleLogoClick}>
            <img
              src="/images/logo.svg"
              alt="Logo"
              width="160"
              height="40"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas id="offcanvasNavbar" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 home_nav">
                <Nav.Link onClick={handleHomeClick}>Home</Nav.Link>
                <Nav.Link onClick={handleAboutClick}>About</Nav.Link>
                <NavDropdown title="Hospitals" id="nav-dropdown">
                  <Form className="d-flex mb-2">
                    <Form.Control
                      type="search"
                      placeholder="Search Hospitals"
                      className="me-2"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form>
                  <NavDropdown.Divider />
                  {filteredHospitals.length > 0 ? (
                    filteredHospitals.map((hospital, index) => (
                      <NavDropdown.Item
                        key={index}
                        onClick={() => handleDonateButtonClick(hospital.id)}
                      >
                        {hospital.name}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item disabled>No hospitals found</NavDropdown.Item>
                  )}
                </NavDropdown>
                <Nav.Link onClick={handleContactClick}>Contact Us</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success" className="border_btn">
                  Search
                </Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;