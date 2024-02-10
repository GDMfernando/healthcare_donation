import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import Header from './header'
import StatisticsBar from './statistics_bar';
import HospitalCards from './hospital_cards';
import CampaignCards from './campaign_cards';
import Footer from './footer';
import { useNavigate } from 'react-router-dom';

const PublicHome = () =>{
    const navigate = useNavigate();

    const hospitalsData = [
        {
          name: 'Hospital A',
          description: 'Description for Hospital A',
          imageUrl: 'path/to/imageA.jpg',
        },
        {
          name: 'Hospital B',
          description: 'Description for Hospital B',
          imageUrl: 'path/to/imageB.jpg',
        },
 
      ];

      const campaignsData = [
        {
          name: 'Campaign A',
          description: 'Description for Campaign A',
          imageUrl: 'path/to/imageA.jpg',
        },
        {
          name: 'Campaign B',
          description: 'Description for Campaign B',
          imageUrl: 'path/to/imageB.jpg',
        },
 
      ];

      const handleCampaignButtonClick = () => {
        navigate('/');
      };

      const handleHospitalButtonClick = () => {
        navigate('/');
      };
    return(
        <div>
            <NavBar/>
            <Header/>
            <StatisticsBar/>
            <HospitalCards title="Registered Hospitals"  buttonText="View More" hospitals={hospitalsData} onButtonClick={handleHospitalButtonClick}/>
            <CampaignCards title="Popular Campaigns" buttonText="View More"  campaigns={campaignsData} onButtonClick={handleCampaignButtonClick}/>
            <Footer/>
        </div>
    );
}
export default PublicHome;