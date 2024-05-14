import React from "react";
import Navbar from "../NavbarFooter/Navbar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyView = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1
  };

  return (
    <>
      <Navbar />
      <div className="container-xl " >
        <div className="mt-5 bg-light bg-gradient row ">
          <div className="col-md-6 mt-2">
            <img
              src="https://www.hollywoodreporter.com/wp-content/uploads/2023/04/IMG-Academy-Stadium.jpg?w=1296"
              className="img-thumbnail img-fluid border rounded"
              alt="..."
              style={{ width: "100%", height: "500px" }}
            />
          </div>
          <div className="col-md-6 d-none d-md-block mt-2">
            <div className="row">
              <div className="col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "250px" }}
                />
              </div>
              <div className="col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "250px" }}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "250px" }}
                />
              </div>
              <div className="col">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "250px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 d-block d-md-none">
            <Slider {...settings}>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXTPuiJmJPHb-4ES2ESNMTU61N2Y1-vANe2w&usqp=CAU"
                  className="img-thumbnail object-fit-md-contain img-fluid border rounded"
                  alt="..."
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </Slider>
          </div>
        </div>
        <div className="mt-4">
            <p>TITLE</p>
        </div>
      </div>
    </>
  );
};

export default PropertyView;
