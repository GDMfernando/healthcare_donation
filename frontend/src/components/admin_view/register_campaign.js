import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import CampaignForm from "../common_components/campaign_form";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";
import axios from "axios";

function RegisterCampaigne(hospitals) {
  const [campaignData, setCampaignData] = useState({
    hospital: "",
    campaignName: "",
    patientName: "",
    campaignTarget: "",
    description: "",
    image: null,
  });
  const imageInputRef = useRef(null);
  const [cookie, _] = useCookies(["access_token"]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setCampaignData({
      ...campaignData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const headers = {
        Authorization: `Bearer ${cookie.access_token}`,
      };

      const formData = new FormData();
      formData.append("hospital_id", parseInt(campaignData.hospital));
      formData.append("name", campaignData.campaignName);
      formData.append("patient_name", campaignData.patientName);
      formData.append("target", campaignData.campaignTarget);
      formData.append("description", campaignData.description);
      formData.append("image", campaignData.image);

      // const fetchOptions = {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${cookie.access_token}`,
      //   },
      //   withCredentials: true,
      //   body: JSON.stringify({
      //     hospital_id: parseInt(campaignData.hospital),
      //     name: campaignData.campaignName,
      //     patient_name: campaignData.patientName,
      //     target: campaignData.campaignTarget,
      //     description: campaignData.description,
      //     image: campaignData.image,
      //   }),
      // };

      const response = await axios.post("http://localhost:5000/api/campaign/register", formData, {
        headers: headers,
      });

      // const response = await callAPI("campaign/register", "POST", fetchOptions);
      if (response?.data?.success) {
        alert("Successfully Registered");
        setCampaignData({
          hospital: "",
          campaignName: "",
          patientName: "",
          campaignTarget: "",
          description: "",
          image: null,
        });

        if (imageInputRef.current) {
          imageInputRef.current.value = "";
        }
      } else {
        alert("Unsuccessfully Registered");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <h2>Register Campaign</h2>
      <CampaignForm
        onSubmit={handleSubmit}
        campaignData={campaignData}
        handleInputChange={handleInputChange}
        buttonText="Register Campaign"
        hospitals={hospitals}
        imageInputRef={imageInputRef}
      />
    </Container>
  );
}
export default RegisterCampaigne;
