import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Icones = ({ setFilteredProperties }) => {
    const sorting = [
        { title: "Garden view", icon: require("./icons8-trees-94.png") },
        { title: "Kitchen", icon: require("./icons8-tableware-94.png") },
        { title: "Workspace", icon: require("./icons8-clerk-94.png") },
        { title: "Pets allowed", icon: require("./icons8-pets-94.png") },
        { title: "Essentials", icon: require("./icons8-tooth-cleaning-kit-94.png") },
        { title: "Mountain", icon: require("./icons8-national-park-94.png") },
        { title: "Wifi", icon: require("./icons8-wifi-94.png") },
        { title: "Free parking", icon: require("./icons8-parking-94.png") },
        { title: "Central air conditioning", icon: require("./icons8-air-conditioner-94.png") },
        { title: "Aid kit", icon: require("./icons8-doctors-bag-94.png") },
    ];

    const [property, setProperty] = useState(() => {
        return JSON.parse(localStorage.getItem('propertyFilters')) || {};
    });

    const [activeButtons, setActiveButtons] = useState(() => {
        return JSON.parse(localStorage.getItem('activeButtons')) || {};
    });

    
    useEffect(() => {
        localStorage.setItem('propertyFilters', JSON.stringify(property));
        localStorage.setItem('activeButtons', JSON.stringify(activeButtons));
    }, [property, activeButtons]);

    
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

        console.log('Current property state:', property);
    };

   
    const finalFilter = async () => {
        const baseURL = 'http://localhost:8080/api/properties/getByFilters';
        try {
            const response = await axios.get(baseURL, { params: property });
            const prop = response.data;
            console.log(prop, 'ok');
            setFilteredProperties(prop);
        } catch (error) {
            console.error('Error fetching property:', error);
        }
    };

    const removeFilters = () => {
        setProperty({});
        setActiveButtons({});
        setFilteredProperties({});
        localStorage.removeItem('propertyFilters');
        localStorage.removeItem('activeButtons');
        console.log('Filters removed.');
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row justify-content-start sm-gap-1">
                    {sorting.map((item, index) => {
                        const formattedWord = formatFilterName(item.title);

                        return (
                            <div key={index} className="col-auto">
                                <button
                                    className={`btn rounded-lg d-flex flex-column align-items-center mr-2 ${
                                        activeButtons[formattedWord] ? 'active' : 'btn-light'
                                    }`}
                                    onClick={() => filter(item.title)}
                                    type="button"
                                    style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}
                                >
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        style={{ width: '26px', height: '24px', marginBottom: '5px' }}
                                    />
                                    <span style={{ fontSize: '15px' }}>{item.title}</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
                <button className='btn btn-outline-success rounded-lg align-items-center mt-3' onClick={finalFilter}>
                    Filter
                </button>
                <button className='btn btn-outline-info rounded-lg align-items-center mt-3 ml-3' onClick={removeFilters}>
                    Remove Filters
                </button>
            </div>
        </>
    );
};

export default Icones;
