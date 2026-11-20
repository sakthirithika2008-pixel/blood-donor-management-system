import React, { useEffect, useState } from "react";
import "./DonorSearch.css";

function DonorSearch() {
const [donors, setDonors] = useState([]);
const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
const [filteredDonors, setFilteredDonors] = useState([]);
const [loading, setLoading] = useState(false);
const [searched, setSearched] = useState(false);

useEffect(() => {
fetchDonors();
}, []);

const fetchDonors = async () => {
try {
setLoading(true);

  const response = await fetch("http://localhost:5000/api/donors");

  if (!response.ok) {
    throw new Error("Failed to fetch donors");
  }

  const data = await response.json();
  setDonors(data);
} catch (error) {
  console.error("Error fetching donors:", error);
  alert("Unable to fetch donors");
} finally {
  setLoading(false);
}

};

const handleSearch = () => {
if (!selectedBloodGroup) {
alert("Please select a Blood Group");
return;
}

const results = donors.filter(
  (donor) => donor.bloodGroup === selectedBloodGroup
);

setFilteredDonors(results);
setSearched(true);

};

return (
<div className="donor-search-page">
<div className="donor-search-header">
<h1>Find Blood Donors</h1>
<p>Every Drop Counts. Every Donor Matters.</p>
</div>

  <div className="donor-search-box">
    <h2>Search Blood Donors</h2>

    <select
      value={selectedBloodGroup}
      onChange={(e) => setSelectedBloodGroup(e.target.value)}
    >
      <option value="">Select Blood Group</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>

    <button onClick={handleSearch}>
      Search Donors
    </button>
  </div>

  {loading && <p className="loading-text">Loading donors...</p>}

  {searched && !loading && (
    <div className="donor-results">
      <h2>Available Donors</h2>

      {filteredDonors.length > 0 ? (
        <div className="donor-card-container">
          {filteredDonors.map((donor) => (
            <div className="donor-card" key={donor._id}>
              <div className="blood-group-badge">
                {donor.bloodGroup}
              </div>

              <h3>{donor.name}</h3>

              <p>
                <strong>Phone:</strong> {donor.phone}
              </p>

              <p>
                <strong>Email:</strong> {donor.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-donors">
          No Matching Donors Found
        </p>
      )}
    </div>
  )}
</div>

);
}

export default DonorSearch;