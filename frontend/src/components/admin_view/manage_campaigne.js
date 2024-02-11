import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';

function ManageCampaign() {
    const [campaigns, setCampaigns] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        fetch('http://localhost:3000/admin-dashboard')
            .then(response => response.json())
            .then(data => setCampaigns(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDelete = (id) => {

        console.log(`Delete Campaign with id: ${id}`);
    };

    const handleEdit = (id) => {

        console.log(`Edit Campaign with id: ${id}`);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCampaigns = campaigns.filter((campaign) => {
        return (
            campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <div>
            <Row>
              <Col><h2>Manage Campaigns</h2></Col>  
                <Form as={Col} className="mb-3">
                    <Form.Group controlId="formSearch">
                        <Form.Control type="text" placeholder="Search campaign" value={searchTerm} onChange={handleSearch}/>
                    </Form.Group>
                </Form>
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Hospital</th>
                        <th>Campaign</th>
                        <th>Patient</th>
                        <th>Target</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {campaigns.map(campaign => (
                        <tr key={campaign.id}>
                            <td>{campaign.hospital}</td>
                            <td>{campaign.name}</td>
                            <td>{campaign.patientName}</td>
                            <td>{campaign.target}</td>
                            <td>{campaign.status}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleEdit(campaign.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(campaign.id)}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default ManageCampaign;