import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { v4 } from "uuid"; 
import { imageDb } from "../AddProperty/Config";

const EditModal = ({ show, onClose, onSave, property }) => {
  const allPossibleProperties = [
    "dedicatedWorkspace",
    "centralAirConditioning",
    "petsAllowed",
    "essentials",
    "kitchen",
    "freeParking",
    "mountainView",
    "firstAidKit",
    "wifi",
    "gardenView",
  ];

  const [formData, setFormData] = useState({
    id: property.id,
    name: property?.name || "",
    description: property?.description || "",
    price: property?.price || "",
    location: property?.location || "",
    properties: property?.properties || {},
    photos: property?.photos || [], 
    photoId: property.photoIds
  });

  const [photoFiles, setPhotoFiles] = useState([]); 
  const [photoError, setPhotoError] = useState("");

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      properties: {
        ...formData.properties,
        [name]: checked,
      },
    });
  };

  const handlePhotoChange = (e, indexToReplace) => {
    const files = Array.from(e.target.files);
    if (files.length !== 1) {
      setPhotoError("You can only replace one photo at a time.");
      return;
    }

    const updatedPhotos = [...formData.photos];
    updatedPhotos[indexToReplace] = URL.createObjectURL(files[0]); 
    setFormData({ ...formData, photos: updatedPhotos });

    const updatedPhotoFiles = [...photoFiles];
    updatedPhotoFiles[indexToReplace] = files[0]; 
    setPhotoFiles(updatedPhotoFiles);

    setPhotoError("");
  };

  const handleSave = async () => {
    if (formData.photos.length !== 5) {
      setPhotoError("You must have exactly 5 photos before saving.");
      return;
    }

    try {
      
      const uploadPromises = photoFiles.map((file, index) => {
        if (file) {
          const imgRef = ref(imageDb, `files/${v4()}`);
          return uploadBytes(imgRef, file).then((value) => getDownloadURL(value.ref));
        }
        return Promise.resolve(formData.photos[index]); 
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      const updatedProperty = {
        ...property,
        ...formData,
        photos: uploadedUrls, 
      };

      onSave(updatedProperty); 
      onClose(); 
    } catch (error) {
      console.error("Error uploading photos:", error.message);
      setPhotoError("Failed to upload photos. Please try again.");
    }
  };

  useEffect(() => {
    if (property) {
      setFormData({
        id: property.id,
        name: property?.name || "",
        description: property?.description || "",
        price: property?.price || "",
        location: property?.location || "",
        properties: property?.properties || {},
        photos: property?.photos || [],
        photoId: property.photoIds,
      });
      setPhotoFiles(new Array(5).fill(null)); 
      setPhotoError("");
    }
  }, [property]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formDescription" className="mt-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group controlId="formLocation" className="mt-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </Form.Group>

          <div>
            {allPossibleProperties.map((propertyName) => (
              <Form.Check
                key={propertyName}
                type="checkbox"
                label={propertyName}
                name={propertyName}
                checked={formData.properties[propertyName] || false}
                onChange={handleChange}
              />
            ))}
          </div>

          <Form.Group controlId="formPhotos" className="mt-4">
            <Form.Label>Property Photos</Form.Label>
            <ul>
              {formData.photos.map((photo, index) => (
                <li key={index} className="d-flex align-items-center mb-2">
                  <img
                    src={photo}
                    alt={`Property ${index + 1}`}
                    style={{ width: "50px", height: "50px", marginRight: "10px" }}
                  />
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoChange(e, index)}
                    style={{ width: "200px" }}
                  />
                </li>
              ))}
            </ul>
            {photoError && <p className="text-danger">{photoError}</p>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
