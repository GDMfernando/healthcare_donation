import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import FormInput from './form_input';
import FormInputWithText from './form_input-withtext';

const DonationFormLocal = ({ onSubmit }) => {
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
      <FormInputWithText controlId={"formDonationAmount"} label={"Donation Amount"} text={"LKR"}
      placeholder={"Enter donation amount"}
      value={donationAmount}
      onChange={(e) => setDonationAmount(e.target.value)} 
      required
      ></FormInputWithText>
  
      <FormInput controlId={"formName"}
        label={"Name"}
        type={"text"}
        placeholder={"Enter your name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      ></FormInput>

      <FormInput controlId={"formEmail"}
        label={"Email address"}
        type={"email"}
        placeholder={"Enter email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      ></FormInput>

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
        Next
      </Button>
    </Form>
  );
};

export default DonationFormLocal;