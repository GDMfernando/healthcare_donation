import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";
function ManageHospitals(activeTab = null) {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cookie, _] = useCookies(["access_token"]);
  useEffect(() => {
    const getAll = async () => {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI("admin/all", "GET", fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setHospitals(data.results);
      } else {
        console.log("Unauthorize");
      }
    };

    getAll();
    return () => {};
  }, [activeTab]);

  const handleDelete = (id) => {
    console.log(`Delete hospital with id: ${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Edit hospital with id: ${id}`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredHospitals = hospitals.filter((hospital) => {
    return (
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Row>
        <Col>
          <h2>Manage Hospitals</h2>
        </Col>
        <Form as={Col} className="mb-3">
          <Form.Group controlId="formSearch">
            <Form.Control
              type="text"
              placeholder="Search by name, address, or type"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form.Group>
        </Form>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
            <tr key={hospital.id}>
              <td>{hospital.name}</td>
              <td>{hospital.address}</td>
              <td>{hospital.phone_number}</td>
              <td>{hospital.email}</td>
              <td>{hospital.type}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEdit(hospital.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(hospital.id)}
                >
                  Delete
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default ManageHospitals;
