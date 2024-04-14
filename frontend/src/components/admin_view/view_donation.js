import React, { useState } from 'react';
import { Table, Form, Row, Col, Tabs, Tab } from 'react-bootstrap';


function ViewDonations() {
    const [donations, setDonations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDonations = donations.filter((donation) => {
        return (
            donation.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });


    return (
        <div>
            <Row className="mb-4">
                <Tabs
                    defaultActiveKey="Hospital"
                    id="justify-tab-example"
                    justify
                >
                    <Tab eventKey="Hospital" title="Hospital Donations">
                        <Form as={Col} className="mb-3 mt-3">
                            <Form.Group controlId="formSearch">
                                <Form.Control type="text" placeholder="Search Donation" value={searchTerm} onChange={handleSearch} />
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
                                {donations.map(donation => (
                                    <tr key={donation.id}>
                                        <td>{donation.hospital}</td>
                                        <td>{donation.amount}</td>
                                        <td>{donation.donorName}</td>
                                        <td>{donation.phone}</td>
                                        <td>{donation.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                    </Tab>
                    <Tab eventKey="Campaign" title="Campaign Donations">
                        <Form as={Col} className="mb-3 mt-3">
                            <Form.Group controlId="formSearch">
                                <Form.Control type="text" placeholder="Search Donation" value={searchTerm} onChange={handleSearch} />
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
                                {donations.map(donation => (
                                    <tr key={donation.id}>
                                        <td>{donation.hospital}</td>
                                        <td>{donation.campaignName}</td>
                                        <td>{donation.amount}</td>
                                        <td>{donation.donorName}</td>
                                        <td>{donation.phone}</td>
                                        <td>{donation.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>


            </Row>

        </div>
    )
}
export default ViewDonations;