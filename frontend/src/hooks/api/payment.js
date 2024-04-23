import { callAPI } from "../../utils/help";

class PaymentAPI {
  static async initStripe(data) {
    console.log("Create payment----------------->>>>");
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await callAPI("payment/stripe/init", "POST", fetchOptions);
      const response = await res.json();
      return response;
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  }

  static async initPayHere(data) {
    console.log("Create payment----------------->>>>");
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await callAPI("payment/payhere/init", "POST", fetchOptions);
      const response = await res.json();
      return response;
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  }

  static async updatePayment(payId, data) {
    console.log("Update payment----------------->>>>");
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await callAPI(`payment/update/${payId}`, "PUT", fetchOptions);
      const response = await res.json();
      return response;
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  }
}

export default PaymentAPI;
