import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GiftCardPage = () => {
    const [amount, setAmount] = useState("$50");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isModalOpen, setModalOpen] = useState(false);
    const [formError, setFormError] = useState("");

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!email || !message) {
            setFormError("Please fill in all the fields.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/giftcards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amount,
                    recipientEmail: email,
                    message: message,
                }),
            });

            if (response.ok) {
                setModalOpen(true);
                setFormError("");
            } else {
                setFormError("Failed to send gift card.");
            }
        } catch (error) {
            console.error("Error:", error);
            setFormError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container text-center my-5">
            <div className="jumbotron bg-primary text-white p-5 rounded">
                <h1 className="display-4">Give the Gift of Travel</h1>
                <p className="lead">Airbnb gift cards are the perfect way to share unforgettable experiences.</p>
                <button
                    className="btn btn-light btn-lg"
                    onClick={() => window.location.href = "#purchase-form"}
                >
                    Buy a Gift Card
                </button>
            </div>

            <div className="row text-center my-5">
                {["$50", "$100", "$200", "$500"].map((price, index) => (
                    <div className="col-lg-3 col-md-6 mb-4" key={index}>
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h5 className="card-title">{price} Gift Card</h5>
                                <p className="card-text">Perfect for a special occasion.</p>
                                <button className="btn btn-outline-primary" onClick={() => setAmount(price)}>
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="purchase-form" className="card p-4 shadow-sm">
                <h3>Purchase a Gift Card</h3>
                {formError && <div className="alert alert-danger">{formError}</div>}
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Select Amount</label>
                        <input type="text" className="form-control" value={amount} readOnly />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Recipient's Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Personal Message</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Write a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-success w-100">Send Gift Card</button>
                </form>
            </div>

            {isModalOpen && (
                <div className="modal show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Success!</h5>
                                <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Your gift card for {amount} has been successfully sent to {email}.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setModalOpen(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GiftCardPage;

