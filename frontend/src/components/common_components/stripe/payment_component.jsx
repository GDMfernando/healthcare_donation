import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function StripePayment(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [donationDetailsIn, setDonationDetailsIn] = useState(
    props.donationDetailsIn
  );

  const initLoad = async () => {
    try {
      const loadStripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_CLIENT_KEY
      );
      setStripePromise(loadStripePromise);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props?.donationDetailsIn) {
      setDonationDetailsIn(props.donationDetailsIn);
      initLoad();
    }
  }, [props]);

  const appearance = {
    theme: "stripe",
  };

  const option = {
    appearance,
    clientSecret: donationDetailsIn?.payment?.client_secret,
  };

  return (
    <div className="p-3 donationForm-box">
      {donationDetailsIn.payment && stripePromise && (
        <Elements stripe={stripePromise} options={option}>
          <CheckoutForm
            reDirectURL={props?.donationDetailsIn.payment_init.return_url}
          />
        </Elements>
      )}
    </div>
  );
}

export default StripePayment;
