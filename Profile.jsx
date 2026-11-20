import React from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

return (
<div className="profile-page">
<div className="profile-box">
<h1>👤 My Profile</h1>
<p>Welcome to your BloodConnect profile.</p>

    <div className="profile-details">
      <p>
        <strong>Full Name:</strong> {user?.name || "Not available"}
      </p>

      <p>
        <strong>Email:</strong> {user?.email || "Not available"}
      </p>

      <p>
        <strong>Blood Group:</strong> {user?.bloodGroup || "Not available"}
      </p>
    </div>

    <Link to="/dashboard">Back to Dashboard</Link>
  </div>
</div>

);
}

export default Profile;