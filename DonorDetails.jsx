import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DonorSearch.css";

function DonorSearch() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setDonors([]);
    setSearched(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/donors"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch donors");
      }

      const data = await response.json();

      const donorList = Array.isArray(data)
        ? data
        : data.donors || [];

      const filteredDonors = donorList.filter((donor) => {
        const donorBlood = (donor.bloodGroup || "")
          .trim()
          .toUpperCase();

        const donorLocation = (
          donor.location ||
          donor.city ||
          donor.area ||
          ""
        ).trim().toLowerCase();

        const matchesBlood =
          donorBlood === bloodGroup.toUpperCase();

        const matchesLocation =
          donorLocation.includes(location.trim().toLowerCase());

        return matchesBlood && matchesLocation;
      });

      setDonors(filteredDonors);
    } catch (err) {
      console.error(err);
      setError(
        "Could not load donors. Please check whether your backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (donor) => {
    navigate("/donor-details", {
      state: { donor },
    });
  };

  return (
    <div className="donor-search-page">

      {/* Navbar */}
      <nav className="donor-navbar">
        <h2 className="donor-logo">
          🩸 BloodConnect
        </h2>

        <Link to="/dashboard" className="back-dashboard">
          ← Dashboard
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="donor-hero">
        <span className="hero-tag">
          ❤️ EVERY DROP COUNTS
        </span>

        <h1>Find Blood Donors</h1>

        <p>
          Connect with registered blood donors.
          Your search could make a difference!
        </p>
      </section>

      {/* Search Section */}
      <section className="donor-search-box">

        <h2>🔍 Search for Donors</h2>

        <p className="search-description">
          Enter your requirements below.
        </p>

        <form onSubmit={handleSearch}>

          <div className="search-fields">

            <div className="form-group">
              <label>Select Blood Group</label>

              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
              >
                <option value="">Choose Blood Group</option>
                {[
                  "A+",
                  "A-",
                  "B+",
                  "B-",
                  "AB+",
                  "AB-",
                  "O+",
                  "O-",
                ].map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>📍 Enter Your Location</label>

              <input
                type="text"
                placeholder="Enter city or area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="search-button"
            disabled={loading}
          >
            {loading ? "Searching..." : "🔍 Search Donors →"}
          </button>

        </form>
      </section>

      {/* Error Message */}
      {error && (
        <div className="donor-error">
          {error}
        </div>
      )}

      {/* Search Results */}
      {searched && !loading && !error && (
        <section className="donor-results">

          <h2>🩸 Search Results</h2>

          {donors.length === 0 ? (
            <div className="no-donors">
              <h3>No Matching Donors Found</h3>
              <p>
                Try searching with another blood group or location.
              </p>
            </div>
          ) : (
            <div className="donor-card-container">

              {donors.map((donor) => (
                <div className="donor-card" key={donor._id}>

                  <div className="donor-blood">
                    {donor.bloodGroup}
                  </div>

                  <h3>
                    {donor.name || donor.fullName || "Donor"}
                  </h3>

                  <p>
                    <strong>Blood Group:</strong>{" "}
                    {donor.bloodGroup}
                  </p>

                  <p className="availability">
                    🟢 {donor.availability || "Registered Donor"}
                  </p>

                  <button
                    onClick={() => viewDetails(donor)}
                  >
                    View Details →
                  </button>

                </div>
              ))}

            </div>
          )}
        </section>
      )}

      {/* Footer */}
      <footer className="donor-footer">
        <p>❤️ Every donor is a potential lifesaver.</p>
        <p>© 2026 BloodConnect | Donate Blood, Save Lives 💗</p>
      </footer>

    </div>
  );
}

export default DonorSearch;