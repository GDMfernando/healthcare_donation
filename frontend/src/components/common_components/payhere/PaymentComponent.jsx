import React from "react";

function PaymentComponent(props) {
  const payment = {
    sandbox: true,
    merchant_id: "1224397", // Replace your Merchant ID
    return_url: "http://sample.com/return",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: "ItemNo12345",
    items: "Donation for flood relief",
    amount: 2300.0,
    currency: "LKR",
    first_name: "Saman",
    last_name: "Perera",
    email: "samanp@gmail.com",
    phone: "0771234567",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South", // optional field
    delivery_city: "Kalutara", // optional field
    delivery_country: "Sri Lanka", // optional field
    custom_1: "", // optional field
    custom_2: "", // optional field
  };

  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
  };

  window.payhere.onDismissed = function onDismissed() {
    console.log("Payment dismissed");
  };

  window.payhere.onError = function onError(error) {
    console.log("Error:" + error);
  };

  function pay() {
    window.payhere.startPayment(payment);
  }

  return (
    <div>
      <button onClick={pay}>Pay with Payhere</button>
    </div>
  );
}

export default PaymentComponent;
