const { callAPI } = require("../../../utils/help");

class HospitalAdminAPI {
  static async getHospitalData(fetchOptions) {
    try {
      const response = await callAPI("hospital/get", "GET", fetchOptions);
      return await response.json();
    } catch (error) {
      console.error("getHospitalData", error);
    }
    return null;
  }

  static async updateHospitalData(hospitalData) {
    try {
      const response = await callAPI(`hospital/update`, "POST", hospitalData);
      return await response.json();
    } catch (error) {
      console.error("updateHospitalData", error);
    }
    return null;
  }
}

export default HospitalAdminAPI;
