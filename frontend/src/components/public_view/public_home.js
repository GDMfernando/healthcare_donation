import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import Header from './header'
import StatisticsBar from './statistics_bar';
import HospitalCards from './hospital_cards';
import CampaignCards from './campaign_cards';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';
import { callAPI } from '../../utils/help';

const PublicHome = () => {
  const navigate = useNavigate();

  const [hospitals, setHospitals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalResponse = await callAPI('hospital/public/all', 'GET');
        const campaignResponse = await callAPI('campaign/public/all', 'GET');

        if (hospitalResponse.ok && campaignResponse.ok) {
          const hospitalData = await hospitalResponse.json();
          const campaignData = await campaignResponse.json();

          console.log('Fetched Hospitals:', hospitalData.results);
          console.log('Fetched Campaigns:', campaignData.results);

          if (hospitalData.results) {
            setHospitals(hospitalData.results);
          }

          setCampaigns(campaignData.results);
        } else {
          console.log('Error fetching data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCampaignButtonClick = () => {
    navigate('/');
  };

  const handleHospitalButtonClick = () => {
    navigate('/');
  };

  return (
    <div className='overflow-x-hidden'>
      <NavBar />
      <Header />
      <StatisticsBar />
      <HospitalCards title="Registered Hospitals" buttonText="View More" hospitals={hospitals.slice(0, 4)} onButtonClick={handleHospitalButtonClick} />
      <CampaignCards title="Active Campaigns" buttonText="View More" campaigns={campaigns.slice(0, 4)} onButtonClick={handleCampaignButtonClick} />
      <Footer />
    </div>
  );
}
export default PublicHome;