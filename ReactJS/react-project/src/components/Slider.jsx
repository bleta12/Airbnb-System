import React, { useState } from 'react';
import Slider1 from './Slider1.jpg';
import Slider2 from './Slider2.jpg';
import Slider3 from './Slider3.png';
import Slider4 from './Slider4.png';

const Slider = () => {
    const [searchText, setSearchText] = useState("");

    const sliderItems = [
        { src: Slider1, caption: "MOST POPULAR AROUND THE WORLD" },
        { src: Slider2, caption: "Vacation with Family" },
        { src: Slider3, caption: "Best decision here!!!" },
        { src: Slider4, caption: "In any time" }
    ];


    const imageStyle = {
        maxHeight: "300px",
        width: "100%",
        objectFit: "cover"
    };

    return (
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
            <div className="carousel-indicators">
                {sliderItems.map((item, index) => (
                    <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-label={`Slide ${index + 1}`}></button>
                ))}
            </div>
            <div className="carousel-inner">
                {sliderItems.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={item.src} style={imageStyle} alt={`Slide ${index + 1}`} />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{item.caption}</h5>
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
                ))}
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
