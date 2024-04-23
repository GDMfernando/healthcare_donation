import React, { useEffect, useState } from "react";
import NavBar from "./nav_bar";
import HospitalCards from "./hospital_cards";
import { callAPI } from "../../utils/help";
import { useNavigate } from "react-router-dom";
import { Pagination, Container } from "react-bootstrap";

function AllHospitals() {
  const [hospitals, setHospitals] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 24;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hospitalResponse = await callAPI("public/hospital/all", "GET");

        if (hospitalResponse.ok) {
          const hospitalData = await hospitalResponse.json();

          console.log("Fetched Hospitals:", hospitalData.results);

          if (hospitalData.results) {
            setHospitals(hospitalData.results);
          }
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const handleDonateButtonClick = async (hospitalId) => {
    try {
      console.log(hospitalId);
      const response = await callAPI(
        `public/hospital/get/${hospitalId}`,
        "GET"
      );
      if (response.ok) {
        const hospitalData = await response.json();
        console.log(hospitalData);
        // const hospitalName = hospitalData.name;
        // navigate(`/hospital-page/${hospitalId}`);
        navigate(`/hospital-page/${hospitalId}`, { state: { hospitalData } });
      } else {
        console.error("Failed to fetch hospital data");
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(hospitals.length / hospitalsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <NavBar />
      <HospitalCards
        title="All Hospitals"
        hospitals={currentHospitals}
        onDonateButtonClick={handleDonateButtonClick}
      />
      {/* Pagination */}
      <Container className="d-flex justify-content-center">
        <Pagination className="mt-4 pagination-wrapper" size="sm">
          <Pagination.Prev onClick={goToPrevPage} />
          {Array.from({
            length: Math.ceil(hospitals.length / hospitalsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={goToNextPage} />
        </Pagination>
      </Container>
    </div>
  );
}
export default AllHospitals;
