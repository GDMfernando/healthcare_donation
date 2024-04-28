// PublicHome.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./nav_bar";
import Header from "./header";
import StatisticsBar from "./statistics_bar";
import HospitalCards from "./hospital_cards";
import CampaignCards from "./campaign_cards";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import { callAPI } from "../../utils/help";
import { Button, Container } from "react-bootstrap";

const PublicHome = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchDataH = async () => {
      try {
        const hospitalResponse = await callAPI("public/hospital/all", "GET");

        if (hospitalResponse.ok) {
          const hospitalData = await hospitalResponse.json();
          if (hospitalData.results) {
            setHospitals(hospitalData.results);
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchDataC = async () => {
      try {
        const campaignResponse = await callAPI("public/campaign/all", "GET");

        if (campaignResponse.ok) {
          const campaignData = await campaignResponse.json();
          setCampaigns(campaignData.results);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataC();
    fetchDataH();
  }, []);

  const handleCampaignButtonClick = () => {
    navigate("/all-campaigns");
  };

  const handleHospitalButtonClick = () => {
    navigate("/all-hospitals");
  };

  const handleDonateButtonClick = async (hospitalId) => {
    try {
      const response = await callAPI(
        `public/hospital/get/${hospitalId}`,
        "GET"
      );
      if (response.ok) {
        const hospitalData = await response.json();
        // const hospitalName = hospitalData.name;
        // navigate(`/hospital-page/${hospitalId}`);
        navigate(`/hospital-page/${hospitalId}`, { state: { hospitalData } });
      } else {
        console.error("Failed to fetch hospital data");
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  const handleDonateCampaignButton = async (campaignId) => {
    try {
      const response = await callAPI(
        `public/campaign/get/${campaignId}`,
        "GET"
      );
      if (response.ok) {
        const campaignData = await response.json();
        navigate(`/campaign-page/${campaignId}`, { state: { campaignData } });
      } else {
        console.error("Failed to fetch campaign data");
      }
    } catch (error) {
      console.error("Error fetching campaign data:", error);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <NavBar />
      <Header />
      <StatisticsBar />
      <HospitalCards
        title="Registered Hospitals"
        hospitals={hospitals.slice(0, 4)}
        onDonateButtonClick={handleDonateButtonClick}
      />
      <Container>
        <Button
          className="px-0 mt-2 viewmore-btn"
          variant="link"
          onClick={handleHospitalButtonClick}
        >
          View More
        </Button>
      </Container>
      <CampaignCards
        title="Active Campaigns"
        campaigns={campaigns.slice(0, 4)}
        onDonateButtonClick={handleDonateCampaignButton}
      />
      <Container>
        <Button
          className="px-0 mt-2 mb-5 viewmore-btn"
          variant="link"
          onClick={handleCampaignButtonClick}
        >
          View More
        </Button>
      </Container>
      <Footer />
    </div>
  );
};
export default PublicHome;
