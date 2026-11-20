import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BloodRequest.css";

function BloodRequest() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    phone: "",
    units: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

    if (!loggedInUser) {
      alert("Please login before submitting a blood request.");
      navigate("/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            userId: loggedInUser.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Request submission failed.");
        return;
      }

      setMessage("Blood request submitted successfully! ❤️");

      setFormData({
        patientName: "",
        bloodGroup: "",
        hospital: "",
        location: "",
        phone: "",
        units: "",
      });

    } catch (error) {
      setMessage("Cannot connect to backend!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blood-request-page">
      <div className="blood-request-box">
        <h1>Request Blood ❤️</h1>
        <p>Fill in the details to submit a blood request.</p>

        <form onSubmit={handleSubmit}>
          <label>Patient Name</label>
          <input
            type="text"
            name="patientName"
            placeholder="Enter patient name"
            value={formData.patientName}
            onChange={handleChange}
            required
          />

          <label>Required Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
              (group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              )
            )}
          </select>

          <label>Hospital Name</label>
          <input
            type="text"
            name="hospital"
            placeholder="Enter hospital name"
            value={formData.hospital}
            onChange={handleChange}
            required
          />

          <label>Location</label>
          <input
            type="text"
            name="location"
            placeholder="Enter city or area"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <label>Contact Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit mobile number"
            pattern="[0-9]{10}"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Units Required</label>
          <input
            type="number"
            name="units"
            placeholder="Enter number of units"
            min="1"
            max="10"
            value={formData.units}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Blood Request"}
          </button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default BloodRequest;