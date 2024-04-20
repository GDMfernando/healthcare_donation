import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import NavBar from './nav_bar';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  const handleContactClick = () => {
    navigate('/contactus');
  };
  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <Container className="my-5">
        <Row>
          <Col xs={12} md={6}>
            {/* Image on the right */}
            <Image className='aboutUs-img' src="./images/close-up-people-volunteer-teamwork-join-hands-togetherstack-handsunity-teamwork-volunteering-conceptual.png" alt="Header Image" fluid />
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center">
            {/* Content and buttons on the left */}
            <div>
              <h2 className='mb-4'>About WishHealth</h2>
              <p>
                Welcome to WishHealth, your dedicated platform for making a positive impact on healthcare in Sri Lanka. At WishHealth, we believe in the transformative power of collective generosity to address critical medical needs. Our mission is to bridge the gap between compassionate donors, hospitals in need, and individuals facing health-related financial crises.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      <div className='about-vision'>
        <Container>
          <h3 className='mb-4'>Our Vision</h3>
          <p>
            WishHealth envisions a future where every individual has access to the healthcare they deserve. We strive to create a transparent and efficient donation platform that empowers communities, fosters compassion, and makes a lasting impact on the health and well-being of Sri Lankans.
          </p>
        </Container>

      </div>
      <Container className="my-5 aboutUs-list">
        <Row>
          <Col xs={12} md={6} className='pe-5 about-whatsets'>
            <h3 className='mb-4'>What Sets Us Apart</h3>
            <ul>
              <li><strong>Focus on Healthcare:</strong> Unlike general donation platforms, WishHealth is exclusively dedicated to the healthcare sector. We understand the unique challenges faced by hospitals and patients, and our platform is tailored to meet these specific needs.</li>
              <li><strong>Transparency and Accountability:</strong> We prioritize transparency in all aspects of our platform. Donors can track the impact of their contributions, ensuring that every rupee goes where it's needed the most. WishHealth is committed to maintaining the highest standards of accountability.</li>
              <li><strong>Empowering Hospitals:</strong> WishHealth is more than just a donation platform; it's a lifeline for hospitals. We provide tools for hospitals to create and manage fundraising campaigns, helping them cover the costs of medical treatments and services.</li>
              <li><strong>User-Friendly Experience:</strong> Our web-based application is designed to be user-friendly, ensuring a seamless experience for both donors and healthcare providers. From secure payment gateways to responsive design, we've considered every detail for your convenience.</li>
            </ul>
          </Col>
          <Col xs={12} md={6} className='ps-5 about-howWorks'>
            <h3 className='mb-4'>How WishHealth Works</h3>
            <ol>
              <li><strong>Discover Causes:</strong> Explore ongoing fundraising campaigns for individual patients and hospitals. Learn about the healthcare needs and the impact your donation can make.</li>
              <li><strong>Contribute Securely:</strong> Make a difference by contributing securely through our platform. We support both local and international donations, providing a global community of support.</li>
              <li><strong>Create Campaigns:</strong> Hospitals can use WishHealth to create and manage fundraising campaigns, reaching a broader audience and covering the costs of medical treatments.</li>
              <li><strong>Track Your Impact:</strong> Donors can track the impact of their contributions, ensuring transparency and fostering a sense of fulfillment in knowing that their support has made a tangible difference.</li>
            </ol>
          </Col>
        </Row>
      </Container>
      <Row className='about-aboveFooter'>
        <Col>
          <h3>Join Us in Making a Difference</h3>
          <p className='mt-3'>
            WishHealth invites you to be a part of a community that cares. <br></br> Together, we can create a healthier, more resilient Sri Lanka. Join us on this journey to make healthcare accessible to all.
          </p>

          <Button variant="primary" onClick={handleContactClick} className="mb-3 primary_btn">Contact Us</Button>
          <p className='mt-3'>
            Thank you for choosing WishHealth – Where Every Contribution Counts!
          </p>
        </Col>
      </Row>

      <Footer />
    </div>
  );
};

export default AboutPage;