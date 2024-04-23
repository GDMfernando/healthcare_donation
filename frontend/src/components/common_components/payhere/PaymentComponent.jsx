import React from "react";
import PaymentAPI from "../../../hooks/api/payment";

function PaymentComponent(props) {
  const { donationDetails } = props;
  const payment = {
    sandbox: true,
    ...donationDetails.payment,
  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
  };

  window.payhere.onDismissed = function onDismissed() {
    PaymentAPI.updatePayment(donationDetails?.payment_init?.pay_id, {
      pay_status: "CANCELLED",
    });
  };

  window.payhere.onError = function onError(error) {
    console.log("Error:" + error);
  };

  if (!donationDetails) {
    alert("Donation details not found");
  } else {
    window.payhere.startPayment(payment);
  }

  return <></>;
}

export default PaymentComponent;
