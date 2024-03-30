import React from 'react';
import {Row, Col } from 'react-bootstrap';
import '../../styles/main.scss';

const StatisticsBar = () => {
    return (
    
            <Row className='statistic_bar py-4'>
                <Col md={3} className='d-flex align-items-center justify-content-center'>
                    <div>
                        <h2 className='mt-3'>{'100K'}</h2>
                        <p>Donation recived</p>
                    </div>
                </Col>

                <Col md={3} className='d-flex align-items-center justify-content-center'>
                    <div>
                        <h2 className='mt-3'>{'LKR1000'}</h2>
                        <p>Donation Raised</p>
                    </div>

                </Col>

                <Col md={3} className='d-flex align-items-center justify-content-center'>
                    <div>
                        <h2 className='mt-3'>{'100K'}</h2>
                        <p>Campaigns</p>
                    </div>
                </Col>

                <Col md={3} className='d-flex align-items-center justify-content-center'>
                    <div>
                        <h2 className='mt-3'>{'100K'}</h2>
                        <p>Hospitals</p>
                    </div>
                </Col>
            </Row>
     
    );

}

export default StatisticsBar;