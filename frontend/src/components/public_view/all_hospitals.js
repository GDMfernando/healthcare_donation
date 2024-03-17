import React, { useEffect, useState } from "react";
import NavBar from './nav_bar'
import HospitalCards from './hospital_cards';
import { callAPI } from '../../utils/help';

function AllHospitals() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const hospitalResponse = await callAPI('hospital/public/all', 'GET');
    
            if (hospitalResponse.ok) {
              const hospitalData = await hospitalResponse.json();
    
              console.log('Fetched Hospitals:', hospitalData.results);
    
              if (hospitalData.results) {
                setHospitals(hospitalData.results);
              }
            } else {
              console.log('Error fetching data');
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);
    return(
<div>
<NavBar />
<HospitalCards title="All Hospitals" hospitals={hospitals} />  
</div>
    );
    
}
export default AllHospitals;