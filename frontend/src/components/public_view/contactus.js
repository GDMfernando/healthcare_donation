import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import FormInput from '../common_components/form_input';
import NavBar from './nav_bar';
import Footer from './footer';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const ContactUsPage = () => {
    // State to manage form input values
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
    };

    return (
        <div className='overflow-x-hidden'>
            <NavBar />
            <Container className="my-5">

                <Row className='d-flex align-items-center'>
                    <Col md={{ span: 6 }}>
                        <ListGroup>
                            <ListGroup.Item className='d-flex border-0'>
                                <FaMapMarkerAlt className='mt-1 me-2'/> <div>No. 123,<br></br>
                                Abc Road,<br></br>
                                Colombo 03 <br></br>
                                Sri Lanka</div>
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0'>
                                <FaPhone className='me-2'/> +94786357777
                            </ListGroup.Item>
                            <ListGroup.Item className='border-0'>
                                <MdEmail className='me-2'/> wishhealth@gmail.com
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={{ span: 6 }}>
                        <h2 className='mb-5'>Contact Us</h2>
                        <Form onSubmit={handleSubmit}>
                            <FormInput
                                controlId="formName"
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <FormInput
                                controlId="formEmail"
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />

                            <FormInput
                                controlId="formSubject"
                                label="Subject"
                                type="text"
                                placeholder="Enter the subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleInputChange}
                                required
                            />

                            <Form.Group controlId="formMessage">
                                <Form.Label>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter your message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className='primary_btn mt-4'>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>

    );
};

export default ContactUsPage;