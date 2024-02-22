import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";

function MainDashboard() {
  const [cookie, _] = useCookies(["access_token"]);

  let [cardsData, setCardsData] = useState([]);

  async function getAdminDashData() {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI(
        "admin/admin-main-dash",
        "GET",
        fetchOptions
      );
      if (response.ok) {
        const data = await response.json();
        setCardsData(data.results);
      } else {
        setCardsData([
          {
            title: "123",
            subtitle: "Donation recived",
          },

          {
            title: "$123",
            subtitle: "Donation Raised",
          },
          {
            title: 0,
            subtitle: "Hospitals",
          },
          {
            title: 0,
            subtitle: "Campaigns",
          },
          {
            title: 0,
            subtitle: "Active Campaigns",
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAdminDashData();
  }, []);

  return (
    <div className="card-container">
      <Row>
        {cardsData.map((card, index) => (
          <Col key={index} md={4} style={{ marginBottom: "15px" }}>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{card.title}</Card.Title>
                <Card.Subtitle className="mt-2 text-muted">
                  {card.subtitle}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default MainDashboard;
