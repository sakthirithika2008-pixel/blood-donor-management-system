import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
const navigate = useNavigate();

return (
<div className="home-page">

  <nav className="home-navbar">
    <div className="home-logo">
      <span className="logo-icon">🩸</span>
      <h2>BloodConnect</h2>
    </div>

    <span className="navbar-tagline">
      Donate Blood. Save Lives.
    </span>
  </nav>

  <main className="home-main">

    <section className="home-hero">

      <div className="hero-content">
        <span className="hero-label">
          ❤️ BE A LIFESAVER
        </span>

        <h1>
          Every Drop of Blood
          <span> Can Save a Life.</span>
        </h1>

        <p>
          Welcome to BloodConnect — a platform that connects
          voluntary blood donors with people who need blood.
          Together, we can make a difference.
        </p>

        <div className="hero-stats">
          <div>
            <h3>Donate</h3>
            <span>Give the gift of life</span>
          </div>

          <div>
            <h3>Connect</h3>
            <span>Find blood donors</span>
          </div>

          <div>
            <h3>Save</h3>
            <span>Make a difference</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="blood-circle">
          <span>🩸</span>
          <h2>Be Someone's</h2>
          <h2>Reason to Smile</h2>
          <p>Donate Blood • Save Lives</p>
        </div>
      </div>

    </section>

    <section className="access-section">

      <div className="section-heading">
        <span>GET STARTED</span>
        <h2>Choose Your Access</h2>
        <p>Join BloodConnect or access your account.</p>
      </div>

      <div className="access-cards">

        <div className="access-card user-card">
          <div className="card-icon">👤</div>

          <h2>User Access</h2>

          <p>
            Register as a donor, find blood donors,
            and connect with people in need.
          </p>

          <button
            className="primary-button"
            onClick={() => navigate("/register")}
          >
            Create Account <span>→</span>
          </button>

          <div className="card-divider">
            <span>Already registered?</span>
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/login")}
          >
            User Login
          </button>
        </div>

        <div className="access-card admin-card">
          <div className="card-icon admin-icon">🛡️</div>

          <h2>Admin Access</h2>

          <p>
            Manage registered users, donors,
            and blood requests through the admin dashboard.
          </p>

          <button
            className="admin-button"
            onClick={() => navigate("/admin-login")}
          >
            Admin Login <span>→</span>
          </button>

          <div className="admin-note">
            <span>🔒</span>
            Authorized administrators only
          </div>
        </div>

      </div>
    </section>

  </main>

  <footer className="home-footer">
    <h3>🩸 BloodConnect</h3>
    <p>Connecting Hearts. Saving Lives.</p>
    <span>© 2026 BloodConnect. All Rights Reserved.</span>
  </footer>

</div>

);
}

export default Home;