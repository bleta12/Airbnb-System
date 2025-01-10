import Dashboard from "./Dashboard";
import { useState,useEffect} from "react";
import {v4 as uuidv4} from "uuid";
import { imageDb } from "../AddProperty/Config";
import {getDownloadURL,ref, uploadBytes } from "firebase/storage";
import  axiosInstance  from '../axiosInstance';
import { jwtDecode } from 'jwt-decode';
import Alert from './Alert';

function MyProfile() {
  const accessToken = localStorage.getItem("accessToken");
  const [decodedToken, setDecodedToken] = useState(null);
  const [profileImage, setProfileImage] = useState(""); 
  const [user, setUser] = useState(""); 
  const [uploading, setUploading] = useState(false);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); 
  const [showAlert, setShowAlert] = useState(false);

  const [password, setPassword] = useState({
    currentPassword: null,
    newPassword: null
  });
  const [passwordError, setPasswordError] = useState('');
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword(prevPassword => ({
      ...prevPassword,
      [name]: value,
    }));

    
    if (name === 'newPassword' && value.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setDecodedToken(decoded); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (decodedToken && decodedToken.id) {
          const response = await axiosInstance.get(`/user/userProfileById/${decodedToken.id}`);
          if (response.data) {
            setUser(response.data); 
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [decodedToken]);

  useEffect(() => {
    if (user && user.profilePicture) {
      setProfileImage(user.profilePicture);
    }
  }, [user]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const uniqueImageName = `profile_pictures/${decodedToken.id}-${uuidv4()}-${file.name}`;
      const imageRef = ref(imageDb, uniqueImageName);

      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);
      setProfileImage(downloadURL);

      await axiosInstance.post(
        "/user/insert/profilePicture",
        { profilePicture: downloadURL, id: decodedToken.id }
      );
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  const saveChanges = async (user, password) => {
    const requestPayload = {
      user: user,
      password: password
    };
  
    try {
      const response = await axiosInstance.put(`/user/updateUserProfile/${decodedToken.id}`, requestPayload);
      console.log('Data saved:', response.data);
      setAlertMessage('Changes saved successfully!');
      setAlertType('success');
      setShowAlert(true);
      setPassword(prevPassword => ({
        ...prevPassword,
        newPassword: null
      }));
      setPassword(prevPassword => ({
        ...prevPassword,
        currentPassword: null
      }));
    } catch (error) {
      console.error('Error saving data:', error);
      setAlertMessage(`Failed to save changes`);
      setAlertType('error');
      setShowAlert(true);
      setPassword(prevPassword => ({
        ...prevPassword,
        newPassword: null
      }));
      setPassword(prevPassword => ({
        ...prevPassword,
        currentPassword: null
      }));
    }
  };
  

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const openSocialModal = () => setIsSocialModalOpen(true);
  const closeSocialModal = () => setIsSocialModalOpen(false);

  const handleUserProfileEditSubmit = (e) => {
    e.preventDefault();
    saveChanges(user, password);
    closeProfileModal();  
  };

  const handleUserSocialEditSubmit = (e) => {
    e.preventDefault();
    if (password.newPassword !=null && password.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    saveChanges(user, password);
    closeSocialModal();  
  };


  return (
    <>
      <div className="container d-flex p-0" style={{ margin: 0, padding: 0 }}>
        {/* Dashboard Sidebar */}
        <div
          className="navbar-nav sidebar sidebar-dark accordion"
          style={{ margin: 0, padding: 0 }}
        >
          <Dashboard />
        </div>
  
        {/* Main Content */}
        <div
          className="main-body flex-grow-1 ms-lg-5 mt-5"
          style={{
            marginLeft: "150px", 
            padding: "15px",
          }}
        >
          <div className="row gutters-sm">
            {/* Profile Card */}
            <div className="col-lg-4 mb-3">
              <div
                className="card"
                style={{ border: "1px solid #e0e0e0" }}
              >
                <div
                  className="card-body"
                  style={{ padding: "5rem" }}
                >
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        profileImage ||
                        "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                      }
                      alt="Profile"
                      className="rounded-circle img-fluid"
                      style={{ width: "150px", height: "auto", maxWidth: "100%" }}
                    />
                    <div className="mt-3 text-center">
                      <h4
                        className="text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {user.name}
                      </h4>
                      <label
                        htmlFor="profileImageInput"
                        className="btn btn-outline-info mt-2 btn-sm"
                      >
                        {uploading ? "Uploading..." : "Edit Profile Picture"}
                      </label>
                      <input
                        id="profileImageInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Social Links */}
              <div className="card mt-3">
      <ul className="list-group list-group-flush">
        {[
          { platform: "Facebook", icon: "facebook", url: user.facebook, colorClass: "text-primary" },
          { platform: "Instagram", icon: "instagram", url: user.instagram, colorClass: "text-danger" },
          { platform: "Snapchat", icon: "snapchat", url: user.snapchat, colorClass: "text-warning" },
          { platform: "Twitter", icon: "twitter-x", url: user.twitter, colorClass: "text-dark" },
        ].map(({ platform, icon, url, colorClass }, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
            style={{ padding: "0.4rem 1rem" }}
          >
            <h6
              className="mb-0"
              style={{ fontSize: "0.9rem", fontWeight: 600, color: "#333" }}
            >
              <i
                className={`bi bi-${icon} ${colorClass} me-2`}
                style={{
                  width: "15px",
                  height: "20px",
                  marginRight: "0.5rem",
                }}
              ></i>
              {platform}
            </h6>
            <span
              className="text-secondary"
              style={{ fontSize: "0.95rem", color: "#6c757d" }}
            >
              {url}
            </span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-end mt-2 mb-2 me-1">
        <button
          className="btn btn-outline-info btn-sm"
          style={{
            fontSize: "0.85rem",
            padding: "0.2rem 1.2rem",
          }}
          onClick={openSocialModal}
        >
          Edit
        </button>
      </div>
    </div>
    </div>
            {/* Information Card */}
            <div className="col-lg-8">
              <div className="card mb-3" style={{ border: "1px solid #e0e0e0" }}>
                <div
                  className="card-body"
                  style={{ padding: "5rem" }}
                >
                  <div className="row">
                    {/* First Name */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        First Name:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                        {user.name}
                      </div>
                    </div>
                    {/* Last Name */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        Last Name:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                       {user.lastname}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    {/* Username */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        Username:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                        {user.username}
                      </div>
                    </div>
                    {/* Password */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        Password:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                        ••••••••
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    {/* Email */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        Email:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                        {user.email}
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="col-sm-6">
                      <h6
                        className="mb-2"
                        style={{ fontSize: "1.15rem", fontWeight: 600, color: "#333" }}
                      >
                        Phone:
                      </h6>
                      <div
                        className="text-secondary"
                        style={{ fontSize: "0.95rem", color: "#6c757d" }}
                      >
                        {user.phoneNumber}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row mb-2">
                  
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <button
                        className="btn btn-info w-100"
                        style={{
                          fontSize: "0.85rem",
                          padding: "0.5rem 1rem",
                        }}
                        onClick={openProfileModal}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>





        {/*Profile Edit Modal*/}
      {isProfileModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeProfileModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUserProfileEditSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                     Email:
                    </label>
                    <input type="email" className="form-control" id="email" value={user.email}   onChange={(e) => setUser({ ...user, email: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                     Phone:
                    </label>
                    <input type="phone" className="form-control" id="phoneNumber" value={user.phoneNumber}   onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="currentPassword" className="form-label">
                     Current Password:
                    </label>
                    <input type="password" className="form-control" id="currentPassword" name="currentPassword" value={password.currentPassword}  onChange={handlePasswordChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label">
                     New Password:
                    </label>
                    <input type="password" className="form-control" id="newPassword" name="newPassword" value={password.newPassword}   onChange={handlePasswordChange} />
                     {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

        {showAlert && (
          <Alert message={alertMessage} type={alertType} onClose={handleAlertClose} />
         )} 






{/*Social Networking Edit Modal*/}

{isSocialModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Social Network</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeSocialModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUserSocialEditSubmit}>
                  <div className="mb-3 bi bi-facebook text-primary">
                    <label htmlFor="facebook" className="form-label text-primary ms-1 ">
                     Facebook:
                    </label>
                    <input type="text" className="form-control" id="facebook" value={user.facebook}   onChange={(e) => setUser({ ...user, facebook: e.target.value })} />
                  </div>
                  <div className="mb-3 bi bi-instagram text-danger">
                    <label htmlFor="Instagram" className="form-label text-dark ms-1 ">
                     Instagram:
                    </label>
                    <input type="text" className="form-control" id="instagram" value={user.instagram}   onChange={(e) => setUser({ ...user, instagram: e.target.value })} />
                  </div>
                  <div className="mb-3 bi bi-snapchat text-warning">
                    <label htmlFor="snapchat" className="form-label text-warning ms-1">
                     Snapchat:
                    </label>
                    <input type="text" className="form-control" id="snapchat" value={user.snapchat}   onChange={(e) => setUser({ ...user, snapchat: e.target.value })} />
                  </div>
                  <div className="mb-3 bi bi-twitter-x  text-dark">
                    <label htmlFor="twitter" className="form-label text-dark ms-1">
                     Twitter
                    </label>
                    <input type="text" className="form-control" id="twitter" value={user.twitter}   onChange={(e) => setUser({ ...user, twitter: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

                {showAlert && (
                  <Alert message={alertMessage} type={alertType} onClose={handleAlertClose} />
                  )}
      </>
    ); 
  
}

export default MyProfile;