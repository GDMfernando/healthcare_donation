import { Card, Nav } from 'react-bootstrap';
import React from 'react';
import '../../styles/main.scss';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const handleAboutClick = () => {
    navigate('/about');
  };
  const handleContactClick = () => {
    navigate('/contactus');
  };

  return (
    <Card className="text-center">
      <Card.Body className='row p-5'>
        <div className='col-md-4 d-flex flex-column align-items-start'>
          <img
            src="/images/logo.svg"
            alt="Logo"
            width="160"
            height="40"
          />
          <Card.Text className="text-left">
            Healing Hope for Patients
          </Card.Text>
        </div>

        <div className='col-md-4'>
          <Nav defaultActiveKey="/home" className="flex-column  align-items-start footer_nav">
            <Nav.Item>
              <Nav.Link onClick={handleAboutClick}>About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={handleContactClick}>Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/services">Successful Campaigns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/all-campaigns">Campaigns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Privacy Policy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className='col-md-4 d-flex '>
          <Card.Text className="text-start">
            <p >
              If you have any questions or inquiries, feel free to reach out to us.
            </p>
            <p >
              <strong>Address:</strong> No. 123,
              Abc Road,
              Colombo 03
              Sri Lanka <br></br>
              <strong>Phone:</strong> +94786357777 <br></br>
              <strong>Email:</strong> wishhealth@gmail.com
            </p>

          </Card.Text>

        </div>
      </Card.Body>
      <Card.Footer className="text-muted">&copy; 2024  WishHealth</Card.Footer>
    </Card>
  );
}

export default Footer;