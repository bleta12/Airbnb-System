import React from 'react';

const Footer = () => {
    return (
        <div className="mt-5 mb-1">
            <footer
                className="text-center text-lg-start text-dark"
                style={{ backgroundColor: "#ECEFF1" }}
            >
                <section
                    className="d-flex justify-content-between p-2 text-white"
                    style={{ backgroundColor: "#87cefa" }}
                >

                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-google"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="/" className="text-white me-4">
                            <i className="fab fa-github"></i>
                        </a>
                    </div>

                </section>

                <section className="">
                    <div className="container-fluid text-center text-md-start">

                        <div className="row mt-2">

                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">

                                <h6 className="text-uppercase fw-bold">AIRBNB</h6>
                                <hr
                                    className="mb-2 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#87cefa", height: "2px" }}
                                />
                                <p>
                                    For anything you need, please contact us!
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-1">
                                <h6 className="text-uppercase fw-bold">Products</h6>
                                <hr
                                    className="mb-2 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#87cefa", height: "2px" }}
                                />
                                <p>
                                    <a href="#!" className="text-dark">Log-in</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Property</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Reservation</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Wishlist</a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-2">
                                <h6 className="text-uppercase fw-bold">Useful links</h6>
                                <hr
                                    className="mb-2 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#87cefa", height: "2px" }}
                                />
                                <p>
                                    <a href="#!" className="text-dark">Your Account</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Become an Affiliate</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Shipping Rates</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-dark">Help</a>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr
                                    className="mb-2 mt-0 d-inline-block mx-auto"
                                    style={{ width: "60px", backgroundColor: "#87cefa", height: "2px" }}
                                />
                                <p><i className="fas fa-home mr-3"></i>Prishtine,Kosovo</p>
                                <p><i className="fas fa-envelope mr-3"></i> airbnb@gmail.com</p>
                                <p><i className="fas fa-phone mr-3"></i> +38345123133</p>
                                <p><i className="fas fa-print mr-3"></i> +38344112233</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    className="text-center p-1"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
                >
                    © 2024 Copyright
                    <a className="text-dark" href="/"></a>
                </div>
            </footer>

        </div>
    );
};

export default Footer;
