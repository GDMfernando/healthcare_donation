import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './nav_bar'
import Header from './header'
import StatisticsBar from './statistics_bar';
import HospitalCards from './hospital_cards';
import CampaignCards from './campaign_cards';
import Footer from './footer';

const PublicHome = () =>{
    return(
        <div>
            <NavBar/>
            <Header/>
            <StatisticsBar/>
            <HospitalCards/>
            <CampaignCards/>
            <Footer/>
        </div>
    );
}
export default PublicHome;