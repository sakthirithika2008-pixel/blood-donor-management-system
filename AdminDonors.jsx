import React from "react";
import { Link } from "react-router-dom";
import "./AdminDonors.css";

function AdminDonors() {
  const donors = [
    { id: 1, name: "Arun Kumar", blood: "A+", city: "Coimbatore" },
    { id: 2, name: "Priya", blood: "B+", city: "Chennai" },
    { id: 3, name: "Rahul", blood: "O+", city: "Madurai" }
  ];

  return (
    <div className="admin-donors-page">
      <h1>🩸 Manage Donors</h1>
      <p>View and manage registered blood donors.</p>

      <div className="donor-list">
        {donors.map((donor) => (
          <div className="admin-donor-card" key={donor.id}>
            <h3>{donor.name}</h3>
            <p>Blood Group: {donor.blood}</p>
            <p>Location: {donor.city}</p>
          </div>
        ))}
      </div>

      <Link to="/admin">Back to Admin Dashboard</Link>
    </div>
  );
}

export default AdminDonors;