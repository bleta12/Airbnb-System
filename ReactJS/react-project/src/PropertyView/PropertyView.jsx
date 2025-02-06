import React, { useState, useEffect } from "react";
import Navbar from "../NavbarFooter/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Footer from "../NavbarFooter/Footer";
import  axiosInstance  from '../axiosInstance';

const PropertyView = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [property, setProperty] = useState(null); 
  const[review , setReviews] = useState("");
  const[avgReview,setAvgReview] = useState("");

  const params = useParams();
  const value = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!value) return;

      try {
        
        const [response1, response2, response3] = await Promise.all([
          axiosInstance.get(`/properties/getById?id=${value}`),
          axiosInstance.get(`/reviews/getReview?idProperty=${value}`),
          axiosInstance.get(`/reviews/getAvgReview?idProperty=${value}`),
        ]);

        setProperty(response1.data);
        setReviews(response2.data);
        setAvgReview(response3.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [value]); 

  console.log(property); 

  console.log("revie",review);
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
  
  {/* Flex container for Location and Overall Rating */}
  <div className="d-flex justify-content-between align-items-center">
    <div>
      <p className="fs-4 fw-medium mb-0">Location:</p>
      <p className="fs-5 fw-light mb-0">{property?.location}</p>
    </div>

    {/* Overall Rating Section */}
    <div className="text-end">
      <h4 className="fs-4 fw-medium mb-0 me-5"> Rating: {avgReview.avgReview}/5</h4>
      <p className="fs-6 text-muted mb-0">({avgReview.countReview} reviews)</p>
      <div className="d-flex justify-content-end">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < avgReview.avgReview ? 'text-warning' : 'text-muted'}>
            &#9733;
          </span>
        ))}
      </div>
    </div>
  </div>

  


</div>

  






        
<div>
      <h2 className="mb-4 mt-5">Reviews</h2>
      {/* Render the array of reviews */}
      {review.length > 0 ? (
        review.map((review, index) => (
          <div key={index} className="card p-3 ms-0 mb-3 mx-auto" style={{ maxWidth: '400px' }}>
            <h5 className="card-title">{review.username}'s Review</h5>
            <div className="card-text">
              <strong>Rating: </strong>
              <div className="d-inline-block">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.ratingValue ? 'text-warning' : 'text-muted'}>
                    &#9733; {/* Star symbol */}
                  </span>
                ))}
              </div>
            </div>
            <p className="card-text"><strong>Comment: </strong>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>

      </div>


      <Footer></Footer>
    </>
  );
};

export default PropertyView;
