// HospitalPage.js
import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./nav_bar";
import Footer from "./footer";
import { Tab, Tabs, Row, Col, Image, Container } from "react-bootstrap";
import DonationFormLocal from "../common_components/donation_form_local";
import { useParams } from "react-router-dom";
import { callAPI } from "../../utils/help";
import { useLocation } from "react-router-dom";
import DonationFormInternational from "../common_components/donation_form_inter";
import StripePayment from "../common_components/stripe/payment_component";
import hospitalSVG from "../../assets/images/hospital.svg";
import PaymentComponent from "../common_components/payhere/PaymentComponent";

import "bootstrap/dist/css/bootstrap.min.css";

const HospitalPage = () => {
  const { hospitalId } = useParams();
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState({});
  const [donationDetails, setDonationDetails] = useState(null);
  const [donationDetailsIn, setDonationDetailsIn] = useState(null);
  const [isLocal, setIsLocal] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [donationType, setDonationType] = useState("local");
  const [redirectUrl, setRedirectUrl] = useState(window.location.origin);

  useEffect(() => {
    const checkPaymetStatus = async () => {
      const URL = new URLSearchParams(location.search);
      const RURL = `${window.location.origin}/hospital-page/${hospitalId}`;
      setRedirectUrl(RURL);
      const paymentStatus = URL.get("redirect_status");
      if (paymentStatus === "succeeded") {
        alert("Payment Successful");
      } else if (paymentStatus === "failed") {
        alert("Payment Failed");
      }
    };

    const fetchHospitalData = async () => {
      try {
        const response = await callAPI(
          `public/hospital/get/${hospitalId}`,
          "GET"
        );
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          console.error("Failed to fetch hospital data");
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };
    fetchHospitalData();
    checkPaymetStatus();
  }, []);

  console.log(donationDetails);

  return (
    <div>
      <NavBar />
      <Container className="p-0">
        <div className="hospital-page-box">
          <Row className="p-4 col-md-12">
            <Col xs={12} md={6}>
              <h1>{hospitalData?.results?.name} Hospital</h1>
              <Image
                className="public-card-image w-100 mb-4 h-50"
                src={
                  hospitalData &&
                  hospitalData?.results &&
                  hospitalData?.results?.image
                    ? `http://localhost:5000/uploads/${hospitalData?.results?.image}`
                    : hospitalSVG
                }
              ></Image>
              <p>{hospitalData?.results?.address}</p>
              <p>{hospitalData?.results?.email}</p>
              <p>{hospitalData?.results?.phone_number}</p>
              <p>{hospitalData?.results?.type}</p>
              <p>{hospitalData?.results?.description}</p>
            </Col>
            <Col xs={12} md={6}>
              <div className="hospital-page-formbox">
                <h3 className="mb-4">
                  Donate to {hospitalData?.results?.name}
                </h3>
                <Tabs
                  defaultActiveKey="Local"
                  id="justify-tab-example"
                  justify
                  onClick={(e) => {
                    e.preventDefault();
                    setDonationType(e.target.innerText.toLowerCase());
                  }}
                >
                  <Tab eventKey="Local" title="Local">
                    {!isLocal && (
                      <DonationFormLocal
                        donationDetails={donationDetails}
                        onSubmit={(value) => {
                          setDonationDetails(value);
                          setIsLocal(true);
                        }}
                      />
                    )}

                    {isLocal && <PaymentComponent />}
                  </Tab>
                  <Tab eventKey="International" title="International">
                    {!isInternational && (
                      <DonationFormInternational
                        donationDetails={donationDetailsIn}
                        onSubmit={(value) => {
                          console.log(value);
                          setDonationDetailsIn(value);
                          setIsInternational(true);
                        }}
                      />
                    )}
                    {isInternational && (
                      <StripePayment
                        clientSecret={donationDetailsIn?.clientSecret ?? null}
                        type={donationType}
                        setIsInternational={setIsInternational}
                        redirectUrl={redirectUrl}
                      />
                    )}
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default HospitalPage;
