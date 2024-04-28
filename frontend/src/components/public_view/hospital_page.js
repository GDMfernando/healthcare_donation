// HospitalPage.js
import React, { useState, useEffect } from "react";
import NavBar from "./nav_bar";
import Footer from "./footer";
import { Tab, Tabs, Row, Col, Image, Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import { callAPI } from "../../utils/help";
import DonationFormInternational from "../common_components/donation_form_inter";
import StripePayment from "../common_components/stripe/payment_component";
import hospitalSVG from "../../assets/images/hospital.svg";
import PaymentAPI from "../../hooks/api/payment";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const HospitalPage = () => {
  const { hospitalId } = useParams();
  const location = useLocation();
  const [hospitalData, setHospitalData] = useState({});
  const [donationDetailsIn, setDonationDetailsIn] = useState(null);
  const [isLocal, setIsLocal] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(window.location.origin);

  useEffect(() => {
    const checkPaytStatus = async () => {
      const URL = new URLSearchParams(location.search);
      const RURL = `${window.location.origin}/hospital-page/${hospitalId}`;
      setRedirectUrl(RURL);
      const paymentStatus = URL.get("redirect_status");
      const payId = URL.get("pay_id");
      if (paymentStatus === "succeeded") {
        PaymentAPI.updatePayment(payId, { pay_status: "SUCCESS" });
        window.location = RURL;
        alert("Payment Successful");
      } else if (paymentStatus === "failed") {
        PaymentAPI.updatePayment(payId, { pay_status: "FAILED" });
        window.location = RURL;
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
    checkPaytStatus();
  }, [hospitalId, location.search]);

  const name = hospitalData?.results?.name;
  const shareUrl = window.location.href;
  const title = `Support ${name ?? " "} Hospital`;

  return (
    <div>
      <NavBar />
      <Container className="p-0">
        <div className="hospital-page-box">
          <Row className="p-4 col-md-12">
            <Col xs={12} md={6}>
              <h1>{hospitalData?.results?.name} Hospital</h1>
              <Image
                className="campaign-page-img"
                src={
                  hospitalData &&
                  hospitalData?.results &&
                  hospitalData?.results?.image
                    ? `http://localhost:5000/uploads/${hospitalData?.results?.image}`
                    : hospitalSVG
                }
              ></Image>
              <p className="m-0 mt-4 donation-page-subheadings">Address</p>
              <p>{hospitalData?.results?.address}</p>
              <p className="m-0 mt-4 donation-page-subheadings">Email</p>
              <p>{hospitalData?.results?.email}</p>
              <p className="m-0 mt-4 donation-page-subheadings">Phone Number</p>
              <p>{hospitalData?.results?.phone_number}</p>
              <p className="m-0 mt-4 donation-page-subheadings">Type</p>
              <p>{hospitalData?.results?.type}</p>
              <p className="m-0 mt-4 donation-page-subheadings">Description</p>
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
                    if (e.target.innerText === "Local") {
                      setIsInternational(false);
                    } else {
                      setIsLocal(false);
                    }
                  }}
                >
                  <Tab eventKey="Local" title="Local">
                    {!isLocal && (
                      <DonationFormInternational
                        donationDetails={donationDetailsIn}
                        onSubmit={(value) => {
                          setDonationDetailsIn(value);
                          setIsLocal(true);
                        }}
                        redirectUrl={redirectUrl}
                        hospitalId={hospitalId}
                      />
                    )}
                    {isLocal && (
                      <StripePayment
                        donationDetailsIn={donationDetailsIn}
                        setIsInternational={setIsInternational}
                        redirectUrl={redirectUrl}
                      />
                    )}
                  </Tab>
                  <Tab eventKey="International" title="International">
                    {!isInternational && (
                      <DonationFormInternational
                        donationDetails={donationDetailsIn}
                        onSubmit={(value) => {
                          setDonationDetailsIn(value);
                          setIsInternational(true);
                        }}
                        redirectUrl={redirectUrl}
                        hospitalId={hospitalId}
                        currencyCode="$"
                      />
                    )}
                    {isInternational && (
                      <StripePayment
                        donationDetailsIn={donationDetailsIn}
                        setIsInternational={setIsInternational}
                        redirectUrl={redirectUrl}
                      />
                    )}
                  </Tab>
                </Tabs>
              </div>

              <div className="mt-4">
                <FacebookShareButton url={shareUrl} quote={title}>
                  <FacebookIcon></FacebookIcon>
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                  <TwitterIcon></TwitterIcon>
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl} title={title}>
                  <LinkedinIcon></LinkedinIcon>
                </LinkedinShareButton>
                <WhatsappShareButton url={shareUrl} title={title}>
                  <WhatsappIcon></WhatsappIcon>
                </WhatsappShareButton>
                <EmailShareButton url={shareUrl} title={title}>
                  <EmailIcon></EmailIcon>
                </EmailShareButton>
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
