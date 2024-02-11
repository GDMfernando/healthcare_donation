import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import CampaignForm from '../common_components/campaign_form';

function EditCampaigne() {
  const [campaignData, setCampaignData] = useState({
    hospital: '',
    campaignName: '',
    patientName: '',
    campaignTarget: '',
    description: '',
    image: null,
  });


  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: name === 'image' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('hospital', campaignData.hospital);
    formData.append('campaignName', campaignData.campaignName);
    formData.append('patientName', campaignData.patientName);
    formData.append('campaignTarget', campaignData.campaignTarget);
    formData.append('description', campaignData.description);
    formData.append('image', campaignData.image);

    try {
      const response = await axios.post('http://localhost:3000/register-campaign', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Campaign update successfully:', response.data);
    } catch (error) {
      console.error('Error upadete campaign:', error);
    }
  };

  return (
    <Container>
      <h2>Edit Campaign</h2>
      <CampaignForm
        onSubmit={handleSubmit}
        campaignData={campaignData}
        handleInputChange={handleInputChange}
        buttonText="Save"
      />
    </Container>
  );

}
export default EditCampaigne;