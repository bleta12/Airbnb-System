import Dashboard from "./Dashboard";
import { jwtDecode } from 'jwt-decode';
import { useState , useEffect} from "react";
import  axiosInstance  from '../axiosInstance';
import { Modal, Button, Form } from 'react-bootstrap';
import Slider from "react-slick";
import EditPropertyModal from "./EditPropertyModal";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';




const MyProperty = () => {

  const accessToken = localStorage.getItem('accessToken');
  const [decodedToken, setDecodedToken] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [showViewDescriptionModal, setShowViewDescriptionModal] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [showAttributesModal, setShowAttributesModal] = useState(false);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);


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

 useEffect(() => {
  const fetchProperty = async () => {
    try {
      if (decodedToken && decodedToken.id) {
        const response = await axiosInstance.get(`/properties/getByUserId?id=${decodedToken.id}`);
        if (response.data) {
          console.log(response.data);  

          const fetchedProperties = response.data.map((property) => ({
            id:property.id,
            name: property.name,
            description: property.description,
            location: property.location,
            price: property.price,
            properties: {
              dedicatedWorkspace: property.dedicatedWorkspace,
              centralAirConditioning: property.centralAirConditioning,
              petsAllowed: property.petsAllowed,
              essentials: property.essentials,
              kitchen: property.kitchen,
              freeParking: property.freeParking,
              mountainView: property.mountainView,
              firstAidKit: property.firstAidKit,
              wifi: property.wifi,
              gardenView: property.gardenView,
            },
            photos: property.attributes && property.attributes.length > 0
              ? [
                  property.attributes[0].photo1,
                  property.attributes[0].photo2,
                  property.attributes[0].photo3,
                  property.attributes[0].photo4,
                  property.attributes[0].photo5
                ] 
              : [],
             photoIds : property.attributes && property.attributes.length > 0
                  ? [property.attributes[0].id]
                   : [],
          }));

          console.log(fetchedProperties); 

          setProperties(fetchedProperties); 
        }
      }
    } catch (error) {
      console.error("Error fetching user properties:", error);
    } finally {
      setLoading(false); 
    }
  };

  fetchProperty();
}, [decodedToken]); 


 if (loading) {
   return <div>Loading...</div>; 
 }

  const handleViewDescription = (row) => {
    setSelectedDescription(row.description);
    setShowViewDescriptionModal(true);
  };

  const handleCloseViewDescriptionModal = () => setShowViewDescriptionModal(false);

  const handleViewAttributes = (row) => {
    const trueAttributes = Object.keys(row.properties)
      .filter((key) => row.properties[key] === true)
      .reduce((obj, key) => {
        obj[key] = row.properties[key];
        return obj;
      }, {});

    setSelectedAttributes(trueAttributes);
    setShowAttributesModal(true);
  };

  const handleCloseAttributesModal = () => setShowAttributesModal(false);


  const handleDelete = async (row) => {
    console.log("id e row ",row.id);
    try {
      const response = await axiosInstance.delete(`/properties/deleteProperty?id=${row.id}`);
      if (response.status === 200) {
        console.log('Deleted row:', row);
        setProperties((prevProperties) => prevProperties.filter(property => property.id !== row.id)); 
      }
    } catch (error) {
      console.error('Error deleting the property:', error.message);
    }
  };
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };




    const handleLocationClick = (location) => {
      const formattedLocation = encodeURIComponent(location); 
      const googleMapsUrl = `https://www.google.com/maps?q=${formattedLocation}`;
      window.open(googleMapsUrl, '_blank');
     };

   
     const handleEditClick = (property) => {
       setSelectedProperty(property);
       setShowModal(true);
     };
   
     const handleClose = () => {
       setShowModal(false);
       setSelectedProperty(null);
     };


   
     const handleSave = async (updatedProperty) => {
      console.log("Updated Property:", updatedProperty);
    
      const formattedData = {
        id: updatedProperty.id,
        name: updatedProperty.name,
        description: updatedProperty.description,
        location: updatedProperty.location,
        price: updatedProperty.price.toString(),
        attributes: [
          {
            id:     updatedProperty.photoIds[0],
            photo1: updatedProperty.photos[0] || null,
            photo2: updatedProperty.photos[1] || null,
            photo3: updatedProperty.photos[2] || null,
            photo4: updatedProperty.photos[3] || null,
            photo5: updatedProperty.photos[4] || null,
          },
        ],
        ...updatedProperty.properties, 
      };
    
      try {
        const response = await axiosInstance.put(
          `/properties/editProperty?id=${updatedProperty.id}`, 
          formattedData 
        );
    
        if (response.status === 200) {
          console.log("Property successfully updated");
          setProperties((prevProperties) => {
            return prevProperties.map((property) =>
              property.id === updatedProperty.id ? updatedProperty : property
            );
          });
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error updating the property:", error.message);
      }
    
      setShowModal(false);
    };
    
    
   


  
  return (
<>
 
    <div className="container d-flex p-0" style={{ margin: 0, padding: 0 }}>
      {/* Sidebar */}
      <div
        className="navbar-nav sidebar sidebar-dark accordion"
        style={{ margin: 0, padding: 0 }}
      >
        <Dashboard />
      </div>
      <div
        className="main-body flex-grow-1 ms-lg-5 mt-5"
        style={{
          marginLeft: '150',
         
        }}
        
      >


<div className="col-md-9 col-lg-10 offset-md-3 offset-lg-2 mt-5 ms-5">
  <div className="container "  style={{
          marginLeft: '150px',
        }}>
    {/* Header Section */}
    <div className="row mb-5">
      <div className="col">
        <h1 className="h3 mb-4 text-dark font-weight-bold">My Properties</h1>
        <p className="text-muted mb-2">
        Manage your property listings here. View details, edit, or delete outdated properties. Keep your listings organized and up to date.
        </p>
      </div>
    </div>

    {/* Property Listings Card */}
    <div className="card shadow-lg border-0 rounded-lg mb-4">
      <div className="card-header py-4 rounded-top">
        <h6 className="m-0 font-weight-bold">Property Listings</h6>
      </div>
        <div className="card-body">
          <div className="table-responsive">
          {properties && properties.length > 0 ? (
            <table className="table table-bordered" width="100%" cellspacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Attributes</th>
                  <th>Photos</th>
                  <th>Actions</th>                 
                </tr>
              </thead>
              <tbody>
                {properties.map((row, index) => (
                  <tr key={index}>
                    <td>{row.name}</td>
                    <td>
                {row.description.split(' ').slice(0, 10).join(' ')}{' '}
                {row.description.split(' ').length > 10 && (
                  <button
                    className="btn btn-link p-0"
                    style={{ textDecoration: 'underline' }}
                    onClick={() => handleViewDescription(row)}
                  >
                    Read More
                  </button>
                )}
              </td>
                    <td>  <span
          className="text-primary"
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => handleLocationClick(row.location)}
        >
          {row.location}
        </span></td>
                    <td>{row.price}€</td>
                    <td>
                <button
                  className="btn btn-outline-info btn-sm ms-2 mt-2"
                  onClick={() => handleViewAttributes(row)}
                >
                  View 
                </button>
              </td>
              <td>
              {row.photos && row.photos.length > 0 ? (
                <div style={{ width: '150px', height: '120px' }}>
                  <Slider {...settings}>
                    {row.photos.map((photo, index) => (
                      <div key={index}>
                        <img
                          src={photo}
                          className="img-thumbnail img-fluid border rounded"
                          alt={`Property Image ${index + 1}`}
                          style={{ width: '100%', height: '100px' }}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              ) : (
                <p>No image available</p>
              )}
            </td>

                    <td>
                      <button
                        className="btn btn-primary btn-sm ml-2 mt-1"
                        onClick={() => handleEditClick(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-2 mt-1"
                        onClick={() => handleDelete(row)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
            ) : (
              <div className="text-center p-4 bg-light rounded border">
              <p className="text-muted fs-5">
              Looks like you don’t have any properties yet. Start by adding one → 
                <Link to="/AddProperty/AddProperty" className="text-primary fw-bold ms-1">
                Host a Property
                </Link>
              </p>
            </div>
            )}

       {/* Pass the modal to this page */}
      {showModal && (
        <EditPropertyModal
          show={showModal}
          onClose={handleClose}
          onSave={handleSave}
          property={selectedProperty}
        />
      )}


      {/* View Full Description Modal */}
            <Modal show={showViewDescriptionModal} onHide={handleCloseViewDescriptionModal}>
              <Modal.Header closeButton>
              <Modal.Title>Full Description</Modal.Title>
             </Modal.Header>
           <Modal.Body>{selectedDescription}</Modal.Body>
           <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewDescriptionModal}>
            Close
          </Button>
             </Modal.Footer>
           </Modal>




             {/* View Attributes Modal */}
      <Modal show={showAttributesModal} onHide={handleCloseAttributesModal}>
        <Modal.Header closeButton>
          <Modal.Title>Attributes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(selectedAttributes).length === 0 ? (
            <p>No active attributes</p>
          ) : (
            <ul>
              {Object.keys(selectedAttributes).map((attribute, index) => (
                <li key={index}>
                  <strong>{attribute.replace(/([A-Z])/g, ' $1')}</strong>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAttributesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
          </div>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
    </>
  );
  
};

export default MyProperty;
