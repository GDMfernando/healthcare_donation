import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function StripePayment(props) {
  console.log("StripePayment props", props);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(props.clientSecret);

  const initLoad = async () => {
    try {
      const loadStripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_CLIENT_KEY
      );
      setStripePromise(loadStripePromise);
    } catch (error) {
      console.log("Error loading stripe");
      console.log(error);
    }
  };

  useEffect(() => {
    if (props?.clientSecret) {
      setClientSecret(props.clientSecret);
      initLoad();
    }
  }, [props]);

  const appearance = {
    theme: "stripe",
  };

  const option = {
    appearance,
    clientSecret,
  };

  return (
    <div className="p-3 donationForm-box">
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={option}>
          <CheckoutForm reDirectURL={props?.redirectUrl} />
        </Elements>
      )}
    </div>
  );
}

export default StripePayment;
