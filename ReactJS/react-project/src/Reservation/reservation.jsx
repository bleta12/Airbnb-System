import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, Navbar } from "react-bootstrap";
import "./button.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Reservation() {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [adults, setAdults] = useState("");
  const [kids, setKids] = useState("");

  const isValidCreditCardNumber = (cardNumber) => {
    const sanitizedNumber = cardNumber.replace(/\D/g, "");

    if (!sanitizedNumber || isNaN(sanitizedNumber)) {
      return false;
    }

    const reversedNumber = sanitizedNumber.split("").reverse().join("");

    let sum = 0;
    for (let i = 0; i < reversedNumber.length; i++) {
      let digit = parseInt(reversedNumber[i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }

    return sum % 10 === 0;
  };

  const handlePay = async (event) => {
    event.preventDefault();

    const cardNumber = document.getElementById("formCardNumber").value;
    if (!isValidCreditCardNumber(cardNumber)) {
      window.alert("Please enter a valid debit card number.");
      return;
    }

    if (selectedCountry === "" || formExpiration() === "" || formCVV() === "") {
      window.alert("Please fill in all fields.");
      return;
    }
    if (!startDate || !endDate) {
      window.alert("Please select check-in and check-out dates.");
      return;
    }

    const reservationData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      country: selectedCountry,

      cardNumber: cardNumber,
      expirationDate: expirationDate,
      cvv: document.getElementById("formCVV").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/reservation/insert",
        reservationData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      console.log("Submitting reservation data...");
      console.log("Check-in Date:", startDate);
      console.log("Check-out Date:", endDate);
      console.log("Selected Country:", selectedCountry);
      console.log("Card Number:", cardNumber);
      console.log(" Expiration Date:", expirationDate);
      console.log("CVV:", reservationData.cvv);
      window.alert("Reservation confirmed!");
    } catch (error) {
      console.error("Error:", error);
      window.alert("Failed to save reservation");
    }
  };

  const formExpiration = () => "MM/YY";
  const formCVV = () => "CVV";

  const countries = [
    "Albania",
    "Austria",
    "Australia",
    "United States",
    "United Kingdom",
    "Canada",
    "Kosovo",
    "Germany",
    "France",
    "Italy",
  ];

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Link className="navbar-brand" to="/Home/Home">
          <span className="fw-bold text-info ml-5">Explore & Stay</span>
        </Link>
      </Navbar>

      <div className="reservation-container">
        <div className="reservation-header">
          <button
            className="back-button"
            onClick={() => navigate("/PropertyView/PropertyView")}
          ></button>
          <div className="confirm-container">
            <h1 className="confirm">Confirm and Pay</h1>
            <span className="txt">
              <h6>Your Trip</h6>
            </span>
          </div>
        </div>

        <div className="reservation-content">
          <div className="date-container">
            <h4>Date</h4>
            <div className="calendar-container">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Check-in "
                className="date-picker"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Check-out"
                className="date-picker"
              />
            </div>
          </div>


          <div className="guests-container">
            <h4>Guests</h4>
            <div className="row">
              <div className="col">
                <Form.Group controlId="adults">
                  <div class="dropdown">
                    <Form.Control
                      type="text"
                      placeholder={adults ? adults : "Adults"}
                      readOnly
                    />

                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul class="dropdown-menu">
                      {[...Array(10)].map((_, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setAdults(index + 1);
                            }}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="kids">
                  <div class="dropdown">
                    <Form.Control
                      type="text"
                      placeholder={kids ? kids : "Kids"}
                      readOnly
                    />

                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></button>
                    <ul class="dropdown-menu">
                      {[...Array(10)].map((_, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setKids(index);
                            }}
                          >
                            {index}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Form.Group>
              </div>
            </div>
          </div>
          <hr />
          <h3 className="payment-header">Payment Details</h3>

          <Form className="payment-form">
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>

            <Form.Group controlId="formExpiration">
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={expirationDate}
                onChange={(e) => {
                  let input = e.target.value;
                  input = input.replace(/\D/g, ""); //largoj vlerat qe nuk jane numra
                  if (input.length > 2) {
                    input = input.slice(0, 2) + "/" + input.slice(2);
                  }
                  setExpirationDate(input);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control type="password" placeholder="CVV" />
            </Form.Group>

            <Button className="payment-button" onClick={handlePay}>
              Confirm and Pay
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
