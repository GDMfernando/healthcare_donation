import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function PaymentComponent() {

    return (
        <Form  className="p-3 payment-form-box">
          <Form.Group controlId="formCardHolderName">
            <Form.Label>Card Holder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card holder name"
              required
            />
          </Form.Group>
    
          <Form.Group controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card number"
              required
            />
          </Form.Group>
    
          <Form.Row>
            <Form.Group controlId="formCvv">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVV"
    
                required
              />
            </Form.Group>
    
            <Form.Group  controlId="formExpiryDate">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"

                required
              />
            </Form.Group>
          </Form.Row>
    
          <Button variant="primary" type="submit">
            Pay
          </Button>
        </Form>
      );
    }


export default PaymentComponent;