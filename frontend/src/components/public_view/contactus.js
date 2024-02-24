import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import FormInput from '../common_components/form_input';
import NavBar from './nav_bar';
import Footer from './footer';

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

                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2>Contact Us</h2>
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