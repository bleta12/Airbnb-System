import React, { useState, useEffect } from "react";
import Navbar from "../NavbarFooter/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import axios from 'axios';

const PropertyView = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [property, setProperty] = useState(null); 

  const params = useParams();
  const value = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!value) return;
      try {
        const response = await axios.get(
          `http://localhost:8080/api/properties/getById?id=${value}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    fetchData();
  }, [value]);

  console.log(property); 

  
  const hasAttributes = property && Array.isArray(property.attributes) && property.attributes.length > 0;

  return (
    <>
      <Navbar />
      <div className="container-xl">
        <div className="mt-5 bg-light bg-gradient row">
          <div className="col-md-6 mt-2">
            {hasAttributes ? (
              <img
                src={property.attributes[0].photo1} 
                className="img-thumbnail img-fluid border rounded"
                alt="Property Image"
                style={{ width: "100%", height: "500px" }}
              />
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div className="col-md-6 d-none d-md-block mt-2">
            <div className="row">
              <div className="col">
                {hasAttributes && property.attributes[0].photo2 ? (
                  <img
                    src={property.attributes[0].photo2}
                    className="img-thumbnail img-fluid border rounded"
                    alt="Additional Property Image"
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <p>No additional image available</p>
                )}
              </div>
              <div className="col">
                {hasAttributes && property.attributes[0].photo3 ? (
                  <img
                    src={property.attributes[0].photo3}
                    className="img-thumbnail img-fluid border rounded"
                    alt="Additional Property Image"
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <p>No additional image available</p>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                {hasAttributes && property.attributes[0].photo4 ? (
                  <img
                    src={property.attributes[0].photo4}
                    className="img-thumbnail img-fluid border rounded"
                    alt="Additional Property Image"
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <p>No additional image available</p>
                )}
              </div>
              <div className="col">
                {hasAttributes && property.attributes[0].photo5 ? (
                  <img
                    src={property.attributes[0].photo5}
                    className="img-thumbnail img-fluid border rounded"
                    alt="Additional Property Image"
                    style={{ width: "100%", height: "250px" }}
                  />
                ) : (
                  <p>No additional image available</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 d-block d-md-none">
            <Slider {...settings}>
              <div>
                <img
                  src={hasAttributes ? property.attributes[0].photo2 : 'fallback-image-url.jpg'}
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="Slider Image 1"
                  style={{ width: "100%", height: "350px" }}
                />
              </div>
              <div>
                <img
                  src={hasAttributes ? property.attributes[0].photo3 : 'fallback-image-url.jpg'}
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="Slider Image 2"
                  style={{ width: "100%", height: "350px" }}
                />
              </div>
              <div>
                <img
                  src={hasAttributes ? property.attributes[0].photo4 : 'fallback-image-url.jpg'}
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="Slider Image 3"
                  style={{ width: "100%", height: "350px" }}
                />
              </div>
              <div>
                <img
                  src={hasAttributes ? property.attributes[0].photo5 : 'fallback-image-url.jpg'}
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="Slider Image 4"
                  style={{ width: "100%", height: "350px" }}
                />
              </div>
            </Slider>
          </div>
        </div>

        <div className="mt-4">
          <p className="fw-semibold fs-1 text-capitalize">{property?.name}</p>
          <hr style={{ height: '1px', border: 'none', backgroundColor: 'black', marginTop: '0px' }} />
          <p className="fs-4 fw-medium">Description:</p>
          <p className="fs-5 fw-light">{property?.description}</p>
        </div>
      </div>
    </>
  );
};

export default PropertyView;
