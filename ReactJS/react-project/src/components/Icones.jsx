import React, { useState, useEffect } from 'react';
import axios from 'axios';

import treesIcon from './icons8-trees-94.png';
import tablewareIcon from './icons8-tableware-94.png';
import clerkIcon from './icons8-clerk-94.png';
import petsIcon from './icons8-pets-94.png';
import toothKitIcon from './icons8-tooth-cleaning-kit-94.png';
import parkIcon from './icons8-national-park-94.png';
import wifiIcon from './icons8-wifi-94.png';
import parkingIcon from './icons8-parking-94.png';
import airConditionerIcon from './icons8-air-conditioner-94.png';
import doctorsBagIcon from './icons8-doctors-bag-94.png';

const Icones = ({ setFilteredProperties }) => {
    const sorting = [
        { title: "Garden view", icon: treesIcon },
        { title: "Kitchen", icon: tablewareIcon },
        { title: "Dedicated Workspace", icon: clerkIcon },
        { title: "Pets allowed", icon: petsIcon },
        { title: "Essentials", icon: toothKitIcon },
        { title: "Mountain view", icon: parkIcon },
        { title: "Wifi", icon: wifiIcon },
        { title: "Free parking", icon: parkingIcon },
        { title: "Central air conditioning", icon: airConditionerIcon },
        { title: "First Aid kit", icon: doctorsBagIcon },
    ];

    const [property, setProperty] = useState({});
    const [activeButtons, setActiveButtons] = useState({});

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                let url = "http://localhost:8080/api/properties/get";
                let response;
                
                if (Object.keys(property).length > 0) {
                    url = "http://localhost:8080/api/properties/getByFilters";
                    response = await axios.get(url, { params: property });
                } else {
                    response = await axios.get(url);
                }

                setFilteredProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [property, setFilteredProperties]);  

    const formatFilterName = (filterName) =>
        filterName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');

    const filter = (filterName) => {
        const formattedWord = formatFilterName(filterName);

        setProperty((prevProperty) => {
            const newProperty = { ...prevProperty };

            if (newProperty[formattedWord]) {
                delete newProperty[formattedWord];  
            } else {
                newProperty[formattedWord] = true;  
            }

            return newProperty;
        });

        setActiveButtons((prev) => ({
            ...prev,
            [formattedWord]: !prev[formattedWord],
        }));
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-start sm-gap-1">
                {sorting.map((item, index) => {
                    const formattedWord = formatFilterName(item.title);

                    return (
                        <div key={index} className="col-auto">
                            <button
                                className={`btn rounded-lg d-flex flex-column align-items-center mr-0 mb-1 ${
                                    activeButtons[formattedWord] ? 'active' : 'btn-light'
                                }`}
                                onClick={() => filter(item.title)}
                                type="button"
                                style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    style={{ width: '24px', height: '24px', marginBottom: '5px' }}
                                />
                                <span style={{ fontSize: '14px' }}>{item.title}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Icones;
