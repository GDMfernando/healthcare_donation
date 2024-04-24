import React, { useEffect, useState } from "react";
import NavBar from "./nav_bar";
import CampaignCards from "./campaign_cards";
import { callAPI } from "../../utils/help";
import { useNavigate } from "react-router-dom";
import { Pagination, Container } from "react-bootstrap";

function AllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const campaignResponse = await callAPI("public/campaign/all", "GET");

        if (campaignResponse.ok) {
          const campaignData = await campaignResponse.json();

          if (campaignData.results) {
            setCampaigns(campaignData.results);
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = campaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  const handleDonateCampaignButton = async (campaignId) => {
    try {
      const response = await callAPI(
        `campaign/public/get/${campaignId}`,
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

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(campaigns.length / campaignsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <NavBar />
      <CampaignCards
        title="All Campaigns"
        campaigns={currentCampaigns}
        onDonateButtonClick={handleDonateCampaignButton}
      />
      <Container className="d-flex justify-content-center">
        <Pagination className="mt-4 pagination-wrapper" size="sm">
          <Pagination.Prev onClick={goToPrevPage} />
          {Array.from({
            length: Math.ceil(campaigns.length / campaignsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={goToNextPage} />
        </Pagination>
      </Container>
    </div>
  );
}
export default AllCampaigns;
