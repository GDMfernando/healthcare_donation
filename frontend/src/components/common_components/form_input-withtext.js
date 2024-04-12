import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const FormInputWithText = ({ controlId, label, placeholder, value, onChange, text }) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup className="mb-3">
        <InputGroup.Text>{text}</InputGroup.Text>
        <Form.Control
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          aria-label="Amount"
        />
      </InputGroup>
    </Form.Group>
  );
};

export default FormInputWithText;