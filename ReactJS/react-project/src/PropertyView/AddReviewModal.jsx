import { Modal, Button, Form, Alert } from "react-bootstrap";
import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { FaStar } from "react-icons/fa";


const AddReviewModal = ({ show, onClose, userId, propertyId }) => {

    const [formData, setFormData] = useState({
        id: null,
        property: { id: propertyId || "" },
        ratingValue: 0,
        user: { id: userId || "" },
        comment: ""
      });
      


  const [error, setError] = useState(null);

  const handleSave = async () => {
    
    try {
      const response = await axiosInstance.post(
        "/reviews/createReview",
        formData
      );
      console.log("Review saved:", response.data);


      setFormData({
        id: null,
        property: { id: propertyId || "" },
        ratingValue: 0,
        user: { id: userId || "" },
        comment: ""
      });
      setError(null);
      onClose();
    } catch (err) {
      console.error("Error saving review:", err);
      setError("There was an error saving your review. Please try again.");
    }
  };

 
  const handleStarClick = (star) => {
    setFormData((prevData) => ({
      ...prevData,
      ratingValue: prevData.ratingValue === star ? 0 : star
    }));
    setError(null);
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Property Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          
          <Form.Group controlId="formRating">
            <Form.Label>
              How would you rate this property? <br />
              <small>Select your rating by clicking on the stars</small>
            </Form.Label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  color={star <= formData.ratingValue ? "#ffc107" : "#e4e5e9"}
                  onClick={() => handleStarClick(star)}
                  style={{ cursor: "pointer", marginRight: 5 }}
                />
              ))}
            </div>
          </Form.Group>

          
          <Form.Group controlId="formComment" className="mt-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="comment"
              placeholder="Write your thoughts here..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  comment: e.target.value
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReviewModal;
