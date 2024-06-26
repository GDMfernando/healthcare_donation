import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";
import { FaEdit } from "react-icons/fa";
import { FaTrash, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ManageCampaign({ activeTab = null, hospitals }) {
  const [campaigns, setCampaigns] = useState([]);
  const [campaigns1, setCampaigns1] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cookie, _] = useCookies(["access_token"]);
  const [editCampaigns, setEditCampaigns] = useState(null);
  const [campaignData, setCampaignData] = useState({
    hospital: "",
    campaignName: "",
    patientName: "",
    campaignTarget: "",
    description: "",
    image: null,
  });

  // Fetch all campaigns
  useEffect(() => {
    getAll();
  }, [activeTab]);

  // Function to fetch all campaigns
  const getAll = async () => {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI("campaign/all", "GET", fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.results);
        setCampaigns1(data.results);
      } else {
        //alert("Fetch unsuccessful");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle campaign deletion
  const handleDelete = async (id) => {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI(
        `campaign/delete/${id}`,
        "GET",
        fetchOptions
      );
      if (response.ok) {
        const data = await response.json();
        alert("Campaign deleted successfully");
        await getAll();
      } else {
        alert("Campaign deleted unsuccessfully");
        console.log("Unauthorize");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle editing campaign
  const handleEdit = (data) => {
    setEditCampaigns(data);
    console.log(data);
    setCampaignData({
      hospital: data.hospital_id || "",
      campaignName: data.name || "",
      patientName: data.patient_name || "",
      campaignTarget: data.target || "",
      description: data.description || "",
    });
  };

  // Function to handle input change in campaign form
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCampaignData({
      ...campaignData,
      [name]: name === "image" ? files[0] : value,
    });
  };

  // Function to handle form submission for updating campaign
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
        body: JSON.stringify({
          hospital_id: parseInt(campaignData.hospital),
          name: campaignData.campaignName,
          patient_name: campaignData.patientName,
          target: campaignData.campaignTarget,
          description: campaignData.description,
        }),
      };

      const response = await callAPI(
        `campaign/update/${editCampaigns.id}`,
        "POST",
        fetchOptions
      );
      if (response.ok) {
        alert("Successfully Updated");
        await getAll();
        setEditCampaigns(null);
      } else {
        alert("Unsuccessfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle search filtering
  const handleSearch = (e) => {
    let searchValue = e.target.value;
    let temp = [];
    if (
      searchValue !== null &&
      searchValue !== "" &&
      searchValue !== undefined
    ) {
      campaigns.forEach((element) => {
        if (
          element.hospital_name
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          element.name
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          element.patient_name
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          element.target
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase()) ||
          element.status
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        ) {
          temp.push(element);
        }
      });

      if (temp.length > 0) {
        console.log(temp);
        setCampaigns(temp);
      }
    } else {
      setCampaigns(campaigns1);
    }
  };

  // Function to generate PDF of campaigns table
  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Hospital", "Campaign", "Patient", "Target", "Status"];
    const tableRows = campaigns.map((campaign) => [
      campaign.hospital_name,
      campaign.name,
      campaign.patient_name,
      campaign.target,
      campaign.status === "ACT" ? "Active" : "Inactive",
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("campaigns.pdf");
  };

  // Render ManageCampaign component
  return (
    <div>
      {editCampaigns !== null ? (
        // Render form for editing campaign
        <div>
          <h2>Edit Campaign</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridHospital">
                <Form.Label>Hospital:</Form.Label>
                <Form.Select
                  defaultValue={campaignData.hospital}
                  name="hospital"
                  value={campaignData.hospital}
                  onChange={handleInputChange}
                  required
                >
                  <option
                    key={editCampaigns.hospital_id}
                    value={editCampaigns.hospital_id}
                  >
                    {editCampaigns.hospital_name}
                  </option>
                  {hospitals?.map((el) =>
                    el.id !== editCampaigns.hospital_id ? (
                      <option key={el.id} value={el.id}>
                        {el.name}
                      </option>
                    ) : (
                      ""
                    )
                  )}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCampaignName">
                <Form.Label>Campaign Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="campaignName"
                  value={campaignData.campaignName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPatientName">
                <Form.Label>Patient Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="patientName"
                  value={campaignData.patientName}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCampaignTarget">
                <Form.Label>Campaign Target:</Form.Label>
                <InputGroup>
                  <InputGroup.Text>LKR</InputGroup.Text>
                  <Form.Control
                    type="text"
                    name="campaignTarget"
                    value={campaignData.campaignTarget}
                    onChange={handleInputChange}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Row>

            <Form.Group controlId="formGridDescription" className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={campaignData.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button
              variant="secondary"
              className="me-2 btn-width"
              type="submit"
              onClick={() => setEditCampaigns(null)}
            >
              Back
            </Button>

            <Button
              variant="primary"
              className="primary_btn btn-width"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <Row className="mb-4 align-items-center">
            {/* Table header and search */}
            <Col>
              <h2>Manage Campaigns</h2>
            </Col>
            <Form as={Col} className="d-flex justify-content-end">
              <Form.Group controlId="formSearch" className="col-7">
                <Form.Control
                  type="text"
                  placeholder="Search campaign"
                  onChange={handleSearch}
                />
              </Form.Group>
              <Button
                className="d-flex align-items-center ms-2"
                variant="outline-primary"
                onClick={generatePDF}
              >
                <FaFilePdf className="me-1"></FaFilePdf>
                <p className="m-0">PDF</p>
              </Button>
            </Form>
          </Row>
          {/* Campaigns table */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Hospital</th>
                <th>Campaign</th>
                <th>Patient</th>
                <th>Target</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td>{campaign.hospital_name}</td>
                  <td>{campaign.name}</td>
                  <td>{campaign.patient_name}</td>
                  <td>{campaign.target}</td>
                  <td>{campaign.status === "ACT" ? "Active" : "Inactive"}</td>
                  <td className="d-flex justify-content-center">
                    <Button
                      className="me-2 d-flex p-0 action-buttons"
                      variant="outline"
                      onClick={() => handleEdit(campaign)}
                    >
                      <FaEdit className="faEdit" />
                    </Button>
                    <Button
                      className="d-flex p-0 action-buttons"
                      variant="outline"
                      onClick={() => handleDelete(campaign.id)}
                    >
                      <FaTrash className="faTrash" />
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default ManageCampaign;
