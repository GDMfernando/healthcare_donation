import React, { useEffect, useState } from "react";
import NavBar from './nav_bar';
import CampaignCards from "./campaign_cards";
import { callAPI } from '../../utils/help';

function AllCampaigns() {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const campaignResponse = await callAPI('campaign/public/all', 'GET');
    
            if (campaignResponse.ok) {
              const campaignData = await campaignResponse.json();
    
              console.log('Fetched Campaigns:', campaignData.results);
    
              if (campaignData.results) {
                setCampaigns(campaignData.results);
              }
            } else {
              console.log('Error fetching data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div>
            <NavBar />
            <CampaignCards title="All Campaigns" campaigns={campaigns} />
        </div>
    );
}
export default AllCampaigns;