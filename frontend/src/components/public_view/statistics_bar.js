import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/main.scss";
import { callAPI } from "../../utils/help";

function StatisticsBar() {
  const [cardsData, setCardsData] = useState([]);

  async function getAdminDashData() {
    try {
      const response = await callAPI("public/admin/admin-main-dash", "GET");
      if (response.ok) {
        const data = await response.json();
        setCardsData(data.results);
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdminDashData();
  }, []);

  return (
    <Row className="statistic_bar py-4">
      <Col md={3} className="text-center">
        <h2 className="mt-3">{cardsData[1]?.title}</h2>
        <p>Donations recived</p>
      </Col>

      <Col md={3} className="text-center">
        <h2 className="mt-3">{cardsData[0]?.title}</h2>
        <p>Donation Raised</p>
      </Col>

      <Col md={3} className="text-center">
          <h2 className="mt-3">{cardsData[2]?.title}</h2>
          <p>Campaigns</p>
      </Col>

      <Col md={3} className="text-center">
          <h2 className="mt-3">{cardsData[3]?.title}</h2>
          <p>Hospitals</p>
      </Col>
    </Row>
  );
}

export default StatisticsBar;
