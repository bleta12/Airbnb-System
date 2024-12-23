import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Icones = ({ setFilteredProperties }) => {
    const sorting = [
        { title: "Garden view", icon: require("./icons8-trees-94.png") },
        { title: "Kitchen", icon: require("./icons8-tableware-94.png") },
        { title: "Dedicated Workspace", icon: require("./icons8-clerk-94.png") },
        { title: "Pets allowed", icon: require("./icons8-pets-94.png") },
        { title: "Essentials", icon: require("./icons8-tooth-cleaning-kit-94.png") },
        { title: "Mountain view", icon: require("./icons8-national-park-94.png") },
        { title: "Wifi", icon: require("./icons8-wifi-94.png") },
        { title: "Free parking", icon: require("./icons8-parking-94.png") },
        { title: "Central air conditioning", icon: require("./icons8-air-conditioner-94.png") },
        { title: "Aid kit", icon: require("./icons8-doctors-bag-94.png") },
    ];

    const [property, setProperty] = useState({});
    const [activeButtons, setActiveButtons] = useState({});

    
    useEffect(() => {
        const fetchAllProperties = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/properties/get");
                setFilteredProperties(response.data);
            } catch (error) {
                console.error('Error fetching all properties:', error);
            }
        };

        fetchAllProperties();
    }, [setFilteredProperties]);  

    
    useEffect(() => {
        const fetchFilteredProperties = async () => {
            if (Object.keys(property).length === 0) {
                
                const response = await axios.get("http://localhost:8080/api/properties/get");
                setFilteredProperties(response.data);
            } else {
                const baseURL = 'http://localhost:8080/api/properties/getByFilters';
                try {
                    const response = await axios.get(baseURL, { params: property });
                    const prop = response.data;
                    setFilteredProperties(prop.length === 0 ? [] : prop);
                } catch (error) {
                    console.error('Error fetching properties:', error);
                }
            }
        };

        fetchFilteredProperties();
    }, [property, setFilteredProperties]);  

    const formatFilterName = (filterName) => {
        return filterName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    };

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

        setActiveButtons((prevActiveButtons) => ({
            ...prevActiveButtons,
            [formattedWord]: !prevActiveButtons[formattedWord],  
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
                                className={`btn rounded-lg d-flex flex-column align-items-center mr-0  mb-1 ${
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
