import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { callAPI } from "../../utils/help";

function ManageHospitals(activeTab = null) {
  const [hospitals, setHospitals] = useState([]);
  const [hospitals1, setHospitals1] = useState([]);
  const [hospitalEdit, setHospitalEdit] = useState(null);
  const [cookie, _] = useCookies(["access_token"]);
  const [hospitalData, setHospitalData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    type: "",
    image: "",
  });
  const getAll = async () => {
    try {
      const fetchOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookie.access_token}`,
        },
        withCredentials: true,
      };
      const response = await callAPI("hospital/all", "GET", fetchOptions);
      if (response.ok) {
        const data = await response.json();
        setHospitals(data.results);
        setHospitals1(data.results);
      } else {
        console.log("Unauthorize");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
    return () => {};
  }, [activeTab]);

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
        `hospital/delete/${id}`,
        "GET",
        fetchOptions
      );
      if (response.ok) {
        const data = await response.json();
        alert("Hospital deleted successfully");
        await getAll();
      } else {
        alert("Hospital deleted unsuccessfully");
        console.log("Unauthorize");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (data) => {
    setHospitalEdit(data);
    setHospitalData({
      name: data.name || "",
      address: data.address || "",
      phone: data.phone_number || "",
      email: data.email || "",
      username: data.username || "",
      password: data.password || "",
      type: data.type || "",
      image: data.image || "",
    });
  };

  const handleSearch = (e) => {
    let searchValue = e.target.value;
    let temp = [];
    if (
      searchValue !== null &&
      searchValue !== "" &&
      searchValue !== undefined
    ) {
      hospitals.forEach((element) => {
        if (
          element.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.address.toLowerCase().includes(searchValue.toLowerCase()) ||
          element.type.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          temp.push(element);
        }
      });

      if (temp.length > 0) {
        setHospitals(temp);
      }
    } else {
      setHospitals(hospitals1);
    }
  };

  const handleInputChange = (e) => {
    setHospitalData({
      ...hospitalData,
      [e.target.name]: e.target.value,
    });
  };

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
          name: hospitalData.name,
          username: null,
          address: hospitalData.address,
          phone_number: hospitalData.phone,
          email: hospitalData.email,
          type: hospitalData.type,
        }),
      };

      const response = await callAPI(
        `hospital/update/${hospitalEdit.id}`,
        "POST",
        fetchOptions
      );
      if (response.ok) {
        alert("Successfully updated");
        setHospitalEdit(null);
        await getAll();
      } else {
        alert("Unsuccessfully updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {hospitalEdit !== null ? (
        <div>
          <h2>Edit Hospital</h2>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridNameEdit">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter email"
                  value={hospitalData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAddressEdit">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={hospitalData.address}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPhoneEdit">
                <Form.Label>Phone Number:</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={hospitalData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Phone Number"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmailEdit">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={hospitalData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email"
                  required
                />
              </Form.Group>
            </Row>

            {/* <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUsernameEdit">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={hospitalEdit.username}
                  onChange={handleInputChange}
                  placeholder="Enter Username"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPasswordEdit">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={hospitalEdit.password}
                  onChange={handleInputChange}
                  placeholder="Enter Password"
                  required
                />
              </Form.Group>
            </Row> */}
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridTypeEdit">
                <Form.Label>Hospital Type:</Form.Label>
                <Form.Select
                  defaultValue="Select Hospital Type"
                  name="type"
                  value={hospitalData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Hospital Type</option>
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formFileEdit">
                <Form.Label>Image:</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  accept="image/*"
                  value={hospitalData.image}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Row>

            <Button
              variant="secondary"
              className="me-2"
              onClick={() => setHospitalEdit(null)}
            >
              Back
            </Button>

            <Button variant="primary" className="primary_btn" type="submit">
              Update
            </Button>
          </Form>
        </div>
      ) : (
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
                      variant="secondary"
                      className="me-2"
                      onClick={() => handleEdit(hospital)}
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
      )}
    </div>
  );
}
export default ManageHospitals;
