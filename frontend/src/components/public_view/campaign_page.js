
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./nav_bar";
import Footer from "./footer";
import { Tab, Tabs, Row, Col, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { callAPI } from "../../utils/help";
import { useLocation } from "react-router-dom";
import DonationFormInternational from "../common_components/donation_form_inter";
import StripePayment from "../common_components/stripe/payment_component";
import PaymentAPI from "../../hooks/api/payment";

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

const CampaignPage = () => {
  const { campaignId } = useParams();
  const location = useLocation();
  const [campaignData, setCampaignData] = useState({});
  const [donationDetailsIn, setDonationDetailsIn] = useState(null);
  const [isLocal, setIsLocal] = useState(false);
  const [isInternational, setIsInternational] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(window.location.origin);
  const [hospitalName, setHospitalName] = useState("");

  useEffect(() => {
    const checkPaytStatus = async () => {
      const URL = new URLSearchParams(location.search);
      const RURL = `${window.location.origin}/campaign-page/${campaignId}`;
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

    const fetchCampaignData = async () => {
      try {
        const response = await callAPI(
          `public/campaign/get/${campaignId}`,
          "GET"
        );
        if (response?.ok) {
          const data = await response.json();
          setCampaignData(data);
          const hospitalId = data?.results?.hospital_id; // Extract hospital ID
          if (hospitalId) {
            const hospitalResponse = await callAPI(
              `public/hospital/get/${hospitalId}`,
              "GET"
            );
            if (hospitalResponse?.ok) {
              const hospitalData = await hospitalResponse.json();
              setHospitalName(hospitalData?.results?.name); // Set hospital name
            }
          }
        } else {
          console.error("Failed to fetch hospital data");
        }
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchCampaignData();
    checkPaytStatus();
  }, [campaignId, location.search]);

  const name = campaignData?.results?.name;
  const shareUrl = window.location.href;
  const title = `Support ${name ?? " "} Campaign`;
  return (
    <div>
      <NavBar />
      <Container className="p-0">
        <div className="hospital-page-box">
          <Row className="col-md-12 p-4">
            <Col xs={12} md={6}>
              <h1>{campaignData?.results?.name}</h1>
              <Image
                className="campaign-page-img"
                src={
                  campaignData &&
                  campaignData?.results &&
                  campaignData?.results?.image &&
                  `http://localhost:5000/uploads/${campaignData?.results?.image}`
                }
              ></Image>
              <p className="m-0 mt-4 donation-page-subheadings">Hospital</p>
         <p>{hospitalName}</p>
              <p className="m-0 donation-page-subheadings">Target </p>
              <p className="donation-target">{campaignData?.results?.target}</p>
              <p className="m-0 donation-page-subheadings">Description</p>
              <p>{campaignData?.results?.description}</p>
            </Col>
            <Col xs={12} md={6}>
              <div className="hospital-page-formbox">
                <h3 className="mb-4">
                  Donate to {campaignData?.results?.name}
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
                        campaignId={campaignId}
                        hospitalId={campaignData?.results?.hospital_id}
                        donationDetails={donationDetailsIn}
                        onSubmit={(value) => {
                          setDonationDetailsIn(value);
                          setIsLocal(true);
                        }}
                        redirectUrl={redirectUrl}
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
                        campaignId={campaignId}
                        hospitalId={campaignData?.results?.hospital_id}
                        donationDetails={donationDetailsIn}
                        onSubmit={(value) => {
                          setDonationDetailsIn(value);
                          setIsInternational(true);
                        }}
                        redirectUrl={redirectUrl}
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

export default CampaignPage;
