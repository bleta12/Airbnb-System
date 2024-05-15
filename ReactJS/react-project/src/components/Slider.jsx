import React, { useState } from 'react';
import Slider1 from './Slider1.jpg';
import Slider2 from './Slider2.jpg';
import Slider3 from './Slider3.png';
import Slider4 from './Slider4.png';

const Slider = () => {
    const [searchText, setSearchText] = useState(""); // State to store the search text

    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={Slider1} className="d-block w-100" alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>MOST POPULAR AROUND THE WORLD</h5>
                        <p>Make unforgettable moments</p>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Enter your search"
                            className="form-control mb-2"
                        />
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={Slider2} className="d-block w-100" alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Vacation with Family</h5>
                        <p>Is there anything better than a family vacation?</p>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Enter your search"
                            className="form-control mb-2"
                        />
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={Slider3} className="d-block w-100" alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Best decision here!!!</h5>
                        <p>Be the first to explore the trendiest things.</p>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Enter your search"
                            className="form-control mb-2"
                        />
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={Slider4} className="d-block w-100" alt="Slide 4" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>In any time</h5>
                        <p>We are here only for you.</p>
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Enter your search"
                            className="form-control mb-2"
                        />
                        <button type="button" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Slider;
