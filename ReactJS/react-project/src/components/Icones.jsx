import React from 'react';
import Navbar from '../NavbarFooter/Navbar';

const Icones = () => {
  const sorting = [
    { title: "Pool", icon: require("./icons8-pool-50.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Workspace", icon: require("./icons8-clerk-94.png") },
    { title: "Pets", icon: require("./icons8-pets-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    { title: "Garden", icon: require("./icons8-trees-94.png") },
    // Add more items with different icons as needed
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
