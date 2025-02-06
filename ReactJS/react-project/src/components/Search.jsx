import React, { useState } from 'react';
import Slider1 from './Slider1.jpg';
import Slider2 from './Slider2.jpg';
import Slider3 from './Slider3.png';
import Slider4 from './Slider4.png';
import axios from 'axios';
import './SliderCss.css'; 

const sliderItems = [
    { src: Slider1, caption: "MOST POPULAR AROUND THE WORLD" },
    { src: Slider2, caption: "Vacation with Family" },
    { src: Slider3, caption: "Best decision here!!!" },
    { src: Slider4, caption: "In any time" }
];


const Search = () => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    const handleChange = async (value) => {
        setInput(value);
        if (value.length >= 1) {
            setShowSearchResults(true);
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/properties/search?keyword=${value}`
                );
                setSearchResults(response.data);
                setNoResults(response.data.length === 0);
            } catch (error) {
                console.error("Error searching:", error);
            }
        } else {
            setShowSearchResults(false);
            setNoResults(false);
            setSearchResults([]);
        }
    };

    
    return (
        <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
                {sliderItems.map((item, index) => (
                    <button key={index} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-label={`Slide ${index + 1}`}></button>
                ))}
            </div>
            <div className="carousel-inner">
                {sliderItems.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <img src={item.src} className="slider-image" alt={`Slide ${index + 1}`} />
                        <div className="carousel-caption d-md-block">
                            <p className='t mt-5 fs-1 fw-light'>{item.caption}</p>
                            <div className="search-container">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder="Enter your search"
                                className="form-control mb-2"
                            />
                            {showSearchResults && (
                                <ul className="search-results list-group">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((result) => (
                                            <li key={result.id} className="list-group-item">
                                                <div className="d-flex align-items-center">
                                                    {result.attributes.map((attr, index) => (
                                                        <img key={index} src={attr.photo1} alt={result.name} className="search-result-image" />
                                                    ))}
                                                    <a href={`/product/${result.id}`} className="search-result-link ml-2">
                                                        <span className='font-serif'>{result.name}</span>
                                                        <p className='fst-italic'>{result.location}</p>
                                                    </a>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        noResults && (
                                            <p className="no-results-message">No Property with such Name</p>
                                        )
                                    )}
                                </ul>
                            )}
                           
                            </div>
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

export default Search;
