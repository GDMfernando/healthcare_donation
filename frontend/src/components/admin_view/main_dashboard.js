import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MainDashboard() {
    const cardsData = [
        {
            title: '123',
            subtitle: 'Donation recived',
        },

        {
            title: '$123',
            subtitle: 'Donation Raised',
        },
        {
            title: '123',
            subtitle: 'Hospitals',
        },
        {
            title: '123',
            subtitle: 'Campaigns',
        },
        {
            title: '20',
            subtitle: 'Active Campaigns',
        },
    ];

    return (
        <div className="card-container">
            <Row>
                {cardsData.map((card, index) => (
                    <Col key={index} md={4} style={{ marginBottom: '15px' }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>{card.title}</Card.Title>
                                <Card.Subtitle className="mt-2 text-muted">{card.subtitle}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
export default MainDashboard;