import { callAPI } from "../../utils/help";

class PaymentAPI {
  static async initStripe(data) {
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

  static async getAllHospitalDonations(fetchOptions) {
    try {
      const res = await callAPI(
        "payment/get/hospital/donations",
        "GET",
        fetchOptions
      );
      const response = await res.json();
      return response;
    } catch (error) {
      console.error("Error getting hospital donations:", error);
    }
  }

  static async getAllCampaignDonations(fetchOptions) {
    try {
      const res = await callAPI(
        "payment/get/campaign/donations",
        "GET",
        fetchOptions
      );
      const response = await res.json();
      return response;
    } catch (error) {
      console.error("Error getting campaign donations:", error);
    }
  }
}

export default PaymentAPI;
