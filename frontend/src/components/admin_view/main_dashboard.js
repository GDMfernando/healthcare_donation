import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";
import { FaDonate,  FaChartLine, FaHospital, FaHospitalUser , FaRegCalendarCheck } from "react-icons/fa";


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

  const icons = [FaDonate, FaChartLine , FaHospital, FaHospitalUser, FaRegCalendarCheck];

  return (
    <div className="card-container">
      <Row>
        {cardsData.map((card, index) => (
          <Col key={index} md={4} style={{ marginBottom: "24px" }}>
            <Card className="main-dashboard-card shadow">
              <Card.Body className="d-flex align-items-center">
                <div className="main-dashboard-cardicon"> {React.createElement(icons[index], { size: "2x" })}</div>
                <div> <Card.Title className="main-dashboard-cardtitle">{card.title}</Card.Title>
                <Card.Subtitle className="mt-2">
                  {card.subtitle}
                </Card.Subtitle></div>
               
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default MainDashboard;
