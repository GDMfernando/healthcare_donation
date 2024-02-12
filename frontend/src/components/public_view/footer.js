import { Card, Nav } from 'react-bootstrap';
import React from 'react';

function Footer() {
  return (
    <Card className="text-center">
      <Card.Body className='row'>
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
          <Nav defaultActiveKey="/home" className="flex-column  align-items-start">
            <Nav.Item>
              <Nav.Link href="/home">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/about">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/services">ServicesSuccessful Campaigns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Campaigns</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Privacy Policy</Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className='col-md-4'>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>

        </div>
      </Card.Body>
      <Card.Footer className="text-muted">&copy; 2024  WishHealth</Card.Footer>
    </Card>
  );
}

export default Footer;