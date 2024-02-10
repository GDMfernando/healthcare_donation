import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import CampaignCards from './campaign_cards';
import Footer from './footer';

const HospitalPage = () =>{
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

    return(
        <div>
            <NavBar/>
            <CampaignCards title="Campaigns" buttonText="More" campaigns={campaignsData} onButtonClick={HospitalPage}/>
            <Footer/>
        </div>
    );
}
export default HospitalPage;