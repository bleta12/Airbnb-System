import React, { useState, useEffect } from "react";
import Navbar from "../NavbarFooter/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams,Link } from "react-router-dom";
import Footer from "../NavbarFooter/Footer";
import  axiosInstance  from '../axiosInstance';
import MeetYourHost from "./MeetYourHost"; 
import AddReviewModal from "./AddReviewModal";
import { Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const PropertyView = () => {
 
  const accessToken = localStorage.getItem('accessToken');
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (accessToken) {
       try {
          const decoded = jwtDecode(accessToken); 
          setDecodedToken(decoded); 
       } catch (error) {
          console.error('Error decoding token:', error); 
       }
    } else {
       console.log('No token found');
    }
 }, [accessToken]);



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [property, setProperty] = useState(""); 
  const[review , setReviews] = useState("");
  const[avgReview,setAvgReview] = useState("");
  const params = useParams();
  const value = params.id;
  const[user,setUser] = useState(null);


  const [showModal, setShowModal] = useState(false);

  const [refreshTrigger, setRefreshTrigger] = useState(false);


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
  }, [value,refreshTrigger]); 

  console.log(property); 

  useEffect(() => {
    const fetchUser = async () => {
      if (!value) return;
      try {
        const response = await axiosInstance.get(`/user/getOwner/${value}`);
        if (response.data) {
          setUser(response.data);
          console.log("hosti",response.data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [value]);

  console.log("revie",review);
  const hasAttributes = property && Array.isArray(property.attributes) && property.attributes.length > 0;

  const selectedFilters = Object.keys(property).filter(
    (key) => typeof property[key] === "boolean" && property[key] === true
  );
  
  



  const handleClose = () => {
    setShowModal(false);
    setRefreshTrigger((prev) => !prev);
   
  };

  const handleCreateReview = () => {
    setShowModal(true);
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");



  const calculateTotalCharge = () => {
    
    const start = new Date(startDate);
    const end = new Date(endDate);

    const timeDiff = end - start;

    const daysBetween = timeDiff / (1000 * 3600 * 24);

    const totalCharge = daysBetween * property.price;

    return { daysBetween, totalCharge };
  };

  const { daysBetween, totalCharge } = calculateTotalCharge();
  

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
  
  <div className="d-flex justify-content-between align-items-center mb-0">
    <div>
      <p className="fs-4 fw-medium mb-0">Location:</p>
      <p className="fs-5 fw-light mb-0">{property?.location}</p>
    </div>
    <div>
    <p className="fs-4 fw-medium mb-1">What this place offers:</p>
    <p className="fs-5 fw-light mb-0">
  {selectedFilters.map((filter, index) => (
    <span key={index}>{filter} <br /></span>
  ))}
</p>

</div>


    <div className="text-end">
      <h4 className="fs-4 fw-medium mb-0 me-5"> Rating: {avgReview.avgReview ? avgReview.avgReview.toFixed(1) : "-"}/5</h4>
      <p className="fs-6 text-muted mb-0">({avgReview.countReview} reviews)</p>
      <div className="d-flex justify-content-end">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < avgReview.avgReview ? 'text-warning' : 'text-muted'}>
            &#9733;
          </span>
        ))}
      </div>
    </div>
    <div className="col-lg-4">
          <div className="card p-4 shadow-lg">
            <h4 className="text-center mb-3">Make a Reservation</h4>
            <form>
              <div className="date-container mb-4">
                <h5 className="ms-2">Date</h5>
                <div className="calendar-container d-flex justify-content-between">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    placeholderText="Check-in"
                    className="date-picker form-control"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Check-out"
                    className="date-picker form-control"
                    disabled={!startDate}
                  />
                </div>
                <div className="alert alert-info mt-3" role="alert">
        <h4 className="alert-heading">Total Charge</h4>
        <p className="mb-0">
          {daysBetween > 0 ? (
            <>
              You will be charged <span className="fw-bold">€{totalCharge}</span> for {daysBetween} day(s) of stay.
            </>
          ) : (
            "Please select both start and end dates. End date cannot be before the start date"
          )}
        </p>
      </div>
              </div>
              <Link to={`../Reservation/reservation/${value}`} className="btn btn-primary w-100">
                Reserve
              </Link>
            </form>
          </div>
        </div>
  </div>

  <hr  className="mt-5"/>


</div>

  






        
<div>
  <h2 className="mt-4 mb-5">Reviews</h2>
  {review.length > 0 ? (
    <div className="container">
      <div className="row">
        {review.map((review, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="card p-3 bg-light">
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
              <p className="card-text">
                <strong>Comment: </strong>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  ) : (
    <p>No reviews available</p>
  )} 



     



  {accessToken && (
        <div className="d-flex flex-column align-items-center justify-content-end mt-5 ">
  <p className="mb-2 mt-5 text-muted">Would you like to share your thoughts about this property? 😊</p>
  <Button
    variant="primary"
    size="md"
    className="px-4"
    onClick={handleCreateReview}
  >
    Leave a Review ✍️
  </Button>
</div>
   )}

    {showModal && decodedToken && (
      <AddReviewModal
      show={showModal}
      onClose={handleClose}
      userId={decodedToken.id}       
      propertyId={property.id} 
    />
)}

</div>



    <hr className="mb-0 mt-3" />
     <div className="mb-5 ms-5">
     <p className="fs-5 fw-medium mb-5 ms-5 mt-5 ">Hosted by:</p>
     {user && avgReview && <MeetYourHost host={user} avgReview={avgReview} />}
    </div>
      </div>

      <div style={{ marginTop:"150px" }}>
      <Footer></Footer>
      </div>
    </>
  );
};

export default PropertyView;
