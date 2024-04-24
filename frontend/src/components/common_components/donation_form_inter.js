import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./form_input";
import FormInputWithText from "./form_input-withtext";
import PaymentAPI from "../../hooks/api/payment";

const DonationFormInternational = ({
  onSubmit,
  donationDetails,
  redirectUrl,
  hospitalId,
  campaignId,
}) => {
  const [donationAmount, setDonationAmount] = useState(
    donationDetails?.donationAmount ?? ""
  );
  const [name, setName] = useState(donationDetails?.name ?? "");
  const [email, setEmail] = useState(donationDetails?.email ?? "");
  const [message, setMessage] = useState(donationDetails?.message ?? "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [payment, setPayment] = useState({});

  const getPaymentIntent = async () => {
    try {
      const fetchOptions = {
        amount: parseFloat(donationAmount),
        currency: "LKR",
        name,
        email,
        return_url: redirectUrl,
        hospital_id: hospitalId?.toString(),
        message,
        campaign_id: campaignId,
      };
      const res = await PaymentAPI.initStripe(fetchOptions);
      if (res.success && res.results) {
        setPayment(res.results);
        setIsUpdating(true);
      } else {
        alert("Error payment initiate. Please try again.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await getPaymentIntent();
  };

  const clearForm = () => {
    setDonationAmount("");
    setName("");
    setEmail("");
    setMessage("");
    setIsUpdating(false);
  };

  useEffect(() => {
    if (isUpdating && payment) {
      onSubmit({
        ...payment,
      });
      clearForm();
    }
  }, [payment, onSubmit, isUpdating]);

  return (
    <Form onSubmit={handleSubmit} className="p-3 donationForm-box">
      <FormInputWithText
        controlId={"formDonationAmount"}
        label={"Donation Amount"}
        text={"$"}
        placeholder={"Enter donation amount"}
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        required
      ></FormInputWithText>

      <FormInput
        controlId={"formName"}
        label={"Name"}
        type={"text"}
        placeholder={"Enter your name"}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      ></FormInput>

      <FormInput
        controlId={"formEmail"}
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
        {["checkbox"].map((type) => (
          <div key={`default-${type}`} className="mt-3">
            <Form.Check
              type={type}
              id={`default-${type}`}
              label={`Donate Anonymously`}
            />
          </div>
        ))}
      </Form>
      <Button variant="primary" className="primary_btn mt-3" type="submit">
        Next
      </Button>
    </Form>
  );
};

export default DonationFormInternational;
