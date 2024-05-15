import React from 'react';
import Navbar from '../NavbarFooter/Navbar';

const Icones = () => {
    const sorting = [
        { title: "Pool", icon: require("./icons8-pool-50.png") },
        { title: "Garden", icon: require("./icons8-trees-94.png") },
        { title: "Kitchen", icon: require("./icons8-tableware-94.png") },
        { title: "Workspace", icon: require("./icons8-clerk-94.png") },
        { title: "Pets", icon: require("./icons8-pets-94.png") },
        { title: "Essentials", icon: require("./icons8-tooth-cleaning-kit-94.png") },
        { title: "Mountain", icon: require("./icons8-national-park-94.png") },
        { title: "WI-FI", icon: require("./icons8-wifi-94.png") },
        { title: "Parking", icon: require("./icons8-parking-94.png") },
        { title: "Air-Conditioner", icon: require("./icons8-air-conditioner-94.png") },
        { title: "Aid-Kit", icon: require("./icons8-doctors-bag-94.png") },

    ];

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <div className="row justify-content-start gap-3 sm-gap-4">
                    {sorting.map((item, index) => (
                        <div key={index} className="col-auto">
                            <button className="btn btn-light rounded-lg d-flex flex-column align-items-center" type="button" style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)' }}>
                                <img src={item.icon} alt={item.title} style={{ width: '50px', height: '50px', marginBottom: '5px' }} />
                                <span style={{ fontSize: '14px' }}>{item.title}</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Icones;