import Navbar from "../NavbarFooter/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Icones from '../components/Icones';
import Cards from '../components/Cards';
import Slider from '../components/Slider';
import Footer from "../NavbarFooter/Footer";
import React, { useState } from 'react';

const Home = () => {
   
    const [filteredProperties, setFilteredProperties] = useState([]);

    return (
        <>
            <div><Navbar /></div>
            <div><Slider /></div>
            <div><Icones setFilteredProperties={setFilteredProperties} /></div>
            <div><Cards filteredProperties={filteredProperties} /></div>
            <div><Footer /></div>


        </>
    );
}
export default Home;