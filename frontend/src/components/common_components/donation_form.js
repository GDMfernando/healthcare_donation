import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const DonationForm = ({ onSubmit }) => {
  const [donationAmount, setDonationAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ donationAmount, name, email, message });
    // Clear form fields after submission
    setDonationAmount('');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Form onSubmit={handleSubmit} className='p-3 donationForm-box'>
      <Form.Group controlId="formDonationAmount">
        <Form.Label>Donation Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter donation amount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mt-2" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mt-2" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mt-2" controlId="formMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Leave a message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <Form>
      {['checkbox'].map((type) => (
        <div key={`default-${type}`} className="mt-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`default-${type}`}
            label={`Donate Anonymously`}
          />
        </div>
      ))}
    </Form>
      <Button variant="primary" className='primary_btn mt-3' type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DonationForm;