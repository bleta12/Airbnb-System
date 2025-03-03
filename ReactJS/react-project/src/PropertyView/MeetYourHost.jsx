import React from "react";
import { FaFacebook, FaInstagram, FaSnapchat, FaXTwitter } from "react-icons/fa6";

const MeetYourHost = ({ host, avgReview }) => {
  const {
    name,
    lastname,
    username,
    profilePicture,
    facebook,
    instagram,
    snapchat,
    twitter,
  } = host;

  
  let hostStatus = "";
  let hostDescription = "";

  if (avgReview?.avgReview >= 4) {
    hostStatus = "Superhost";
    hostDescription = "Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.";
  } else if (avgReview?.avgReview >= 3) {
    hostStatus = "Great host";
    hostDescription = "This host has received positive reviews and is dedicated to providing a great experience.";
  } else {
    hostStatus = "New or improving host";
    hostDescription = "This host is building their reputation and working to provide great stays.";
  }

  return (
    <div className="d-flex align-items-center justify-content-center p-4" style={{ maxWidth: "700px", margin: "auto" }}>
      <img
        src={
          profilePicture ||
          "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
        }
        alt="Profile"
        className="rounded-circle border border-secondary me-4"
        style={{ width: "200px", height: "200px", objectFit: "cover", padding: "5px", background: "white" }}
      />
      
      <div>
        <h2 className="text-info">{name} {lastname}</h2>
        <h4 className="text-muted">@{username}</h4>
        <p className="fs-5 fw-semibold text-success">{hostStatus}</p>
        <p className="text-dark">{hostDescription}</p>
        <p className="text-muted">
        Based on {avgReview?.countReview ?? 0} reviews with an average rating of {avgReview?.avgReview ? avgReview.avgReview.toFixed(1) : "-"}
       </p>
        <div className="d-flex gap-3 mt-2">
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook size={28} className="text-primary" />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={28} className="text-danger" />
            </a>
          )}
          {snapchat && (
            <a href={snapchat} target="_blank" rel="noopener noreferrer">
              <FaSnapchat size={28} className="text-warning" />
            </a>
          )}
          {twitter && (
            <a href={twitter} target="_blank" rel="noopener noreferrer">
              <FaXTwitter size={28} className="text-dark" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetYourHost;
