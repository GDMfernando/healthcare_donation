import React, { useEffect, useState } from "react";
import { Table, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useCookies } from "react-cookie";
import PaymentAPI from "../../hooks/api/payment";

function ViewDonations(props) {
  const [cookie, _] = useCookies(["access_token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [campaignDonations, setCampaignDonations] = useState([]);
  const [activeTab, setActiveTab] = useState();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchHospitalDonations = async () => {
      try {
        const fetchOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.access_token}`,
          },
          withCredentials: true,
        };
        const response = await PaymentAPI.getAllHospitalDonations(fetchOptions);
        if (response.success) {
          setDonationData(response.results);
        } else {
          alert("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchHospitalDonations();
  }, [activeTab, cookie.access_token]);

  useEffect(() => {
    const fetchCampaignDonations = async () => {
      try {
        const fetchOptions = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookie.access_token}`,
          },
          withCredentials: true,
        };
        const response = await PaymentAPI.getAllCampaignDonations(fetchOptions);
        if (response.success) {
          setCampaignDonations(response.results);
        } else {
          alert("Failed to fetch donations");
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchCampaignDonations();
  }, [activeTab, cookie.access_token]);

  return (
    <div>
      <Row className="mb-4">
        <Tabs
          defaultActiveKey="Hospital"
          id="justify-tab-example"
          justify
          onClick={(e) => {
            e.preventDefault();
            setActiveTab(e);
          }}
        >
          <Tab eventKey="Hospital" title="Hospital Donations">
            <Form as={Col} className="mb-3 mt-3">
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="Search Donation"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Amount</th>
                  <th>Donor Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {donationData.map((donation, index) => (
                  <tr key={`donner_${index + 20}`}>
                    <td>{donation.hospital_name}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.donner_name}</td>
                    <td>{donation.hospital_phone_number}</td>
                    <td>{donation.donner_email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="Campaign" title="Campaign Donations">
            <Form as={Col} className="mb-3 mt-3">
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="Search Donation"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hospital</th>
                  <th>Campaign</th>
                  <th>Amount</th>
                  <th>Donor Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {campaignDonations.map((donation, index) => (
                  <tr key={`donner_${index + 1}`}>
                    <td>{donation.hospital_name}</td>
                    <td>{donation.campaign_name}</td>
                    <td>{donation.amount}</td>
                    <td>{donation.donner_name}</td>
                    <td>{donation.hospital_phone_number}</td>
                    <td>{donation.donner_email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Row>
    </div>
  );
}
export default ViewDonations;
