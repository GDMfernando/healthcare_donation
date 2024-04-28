import React, { useEffect, useState } from "react";
import { Table, Form, Row, Col, Tabs, Tab, Button} from "react-bootstrap";
import { useCookies } from "react-cookie";
import PaymentAPI from "../../hooks/api/payment";
import { FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ViewDonations(props) {
  const [cookie, _] = useCookies(["access_token"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [donationData, setDonationData] = useState([]);
  const [campaignDonations, setCampaignDonations] = useState([]);
  const [activeTab, setActiveTab] = useState();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const filterDataDonation = donationData.filter((donation) => {
    return (
      donation.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.hospital_phone_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.donner_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filterDataDonationC = campaignDonations.filter((donation) => {
    return (
      donation.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.campaign_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.donner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.hospital_phone_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      donation.donner_email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
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

  const generatehdPDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ["Hospital", "Amount", "Donor Name", "Phone", "Email"];

    // Prepare rows data
    const rows = donationData.map((donation) => [
      donation.hospital_name,
      donation.amount,
      donation.donner_name,
      donation.hospital_phone_number,
      donation.donner_email
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      didDrawCell: (data) => {
        console.log(data);
      },
    });

    doc.save("hospitalDonations_table.pdf");
  };

  const generatecdPDF = () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // Define columns for the table
    const columns = ["Hospital", "Campaign", "Amount", "Donor Name", "Phone", "Email"];

    // Prepare rows data
    const rows = campaignDonations.map((donation) => [
      donation.hospital_name,
      donation.campaign_name,
      donation.amount,
      donation.donner_name,
      donation.hospital_phone_number,
      donation.donner_email
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      didDrawCell: (data) => {
        console.log(data);
      },
    });

    doc.save("campaignDonation_table.pdf");
  };

  return (
    <div>
      <Row className="mb-4 viewDonation-wrapper">
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
            <Form as={Col} className="mb-3 mt-3 d-flex">
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="Search Donation"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
              <Button
                className="d-flex align-items-center ms-2"
                variant="outline-primary"
                onClick={generatehdPDF}
              >
                <FaFilePdf className="me-1"></FaFilePdf>
                <p className="m-0">PDF</p>
              </Button>
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
                {filterDataDonation.map((donation, index) => (
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
            <Form as={Col} className="mb-3 mt-3 d-flex">
              <Form.Group controlId="formSearch">
                <Form.Control
                  type="text"
                  placeholder="Search Donation"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </Form.Group>
              <Button
                className="d-flex align-items-center ms-2"
                variant="outline-primary"
                onClick={generatecdPDF}
              >
                <FaFilePdf className="me-1"></FaFilePdf>
                <p className="m-0">PDF</p>
              </Button>
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
                {filterDataDonationC.map((donation, index) => (
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
