import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  } catch {
    user = {};
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="brand">
          <div className="brand-logo">🩸</div>
          <h2>Blood<span>Connect</span></h2>
          <p>Donate Blood, Save Lives</p>
        </div>

        <nav className="sidebar-menu">

          <Link to="/dashboard" className="menu-item active">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/profile" className="menu-item">
            <span>👤</span>
            My Profile
          </Link>

          <Link to="/donors" className="menu-item">
            <span>👥</span>
            Find Donors
          </Link>

          <Link to="/blood-request" className="menu-item">
            <span>🩸</span>
            Blood Requests
          </Link>

          <Link to="/my-requests" className="menu-item">
            <span>📋</span>
            My Requests
          </Link>

          <div className="menu-divider"></div>

          <button
            onClick={handleLogout}
            className="menu-item logout-item"
          >
            <span>⇥</span>
            Logout
          </button>

        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-heart">❤️</div>
          <p>Together,<br />we can save lives ❤️</p>
        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* TOP HEADER */}
        <header className="dashboard-header">

          <div className="header-decoration">
            <span>〰</span> ❤️
          </div>

          <div className="header-user">

            <span className="notification">♧</span>

            <div className="user-avatar">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>

            <span className="user-name">
              {user.name || "User"}
            </span>

          </div>

        </header>


        {/* WELCOME BANNER */}
        <section className="welcome-banner">

          <div className="welcome-content">

            <span className="welcome-label">
              WELCOME TO BLOODCONNECT
            </span>

            <h1>
              Welcome, {user.name || "User"}! 👋
            </h1>

            <p>
              Together, let's make every drop count.
            </p>

            <Link
              to="/blood-request"
              className="donate-button"
            >
              🩸 Request Blood <span>→</span>
            </Link>

          </div>

          <div className="banner-art">
            <div className="banner-drop">🩸</div>
            <div className="banner-heart">♡</div>
            <div className="banner-plus">+</div>
          </div>

        </section>


        {/* USER DETAILS */}
        <section className="details-card">

          <div className="details-left">

            <div className="profile-circle">👤</div>

            <div className="details-content">

              <h2>My Details</h2>

              <div className="details-grid">

                <div>
                  <strong>Name</strong>
                  <p>{user.name || "Not available"}</p>
                </div>

                <div>
                  <strong>Email</strong>
                  <p>{user.email || "Not available"}</p>
                </div>

                <div>
                  <strong>Blood Group</strong>
                  <p>{user.bloodGroup || "Not available"}</p>
                </div>

              </div>

            </div>

          </div>

          <div className="details-message">
            <h2>“Be a Hero...</h2>
            <h2>Donate Blood!” ❤️</h2>
          </div>

        </section>


        {/* QUICK ACTIONS */}
        <section className="quick-actions">

          <div className="section-heading">

            <div className="heading-icon">ϟ</div>

            <div>
              <h2>Quick Actions</h2>
              <p>Access important features quickly.</p>
            </div>

          </div>


          <div className="action-grid">

            {/* MY PROFILE */}
            <Link to="/profile" className="action-card">

              <div className="action-icon">👤</div>

              <div className="action-info">
                <h3>My Profile</h3>
                <p>View and update your details</p>
              </div>

              <span className="action-arrow">→</span>

            </Link>


            {/* FIND DONORS */}
            <Link to="/donors" className="action-card">

              <div className="action-icon">👥</div>

              <div className="action-info">
                <h3>Find Donors</h3>
                <p>Search for blood donors near you</p>
              </div>

              <span className="action-arrow">→</span>

            </Link>


            {/* BLOOD REQUESTS */}
            <Link to="/blood-request" className="action-card">

              <div className="action-icon">🩸</div>

              <div className="action-info">
                <h3>Blood Requests</h3>
                <p>Request blood if needed</p>
              </div>

              <span className="action-arrow">→</span>

            </Link>


            {/* MY REQUESTS */}
            <Link to="/my-requests" className="action-card">

              <div className="action-icon">📋</div>

              <div className="action-info">
                <h3>My Requests</h3>
                <p>View your submitted requests</p>
              </div>

              <span className="action-arrow">→</span>

            </Link>

          </div>

        </section>


        {/* FOOTER */}
        <footer className="dashboard-footer">
          ❤️ &nbsp; © 2026 BloodConnect | Donate Blood, Save Lives &nbsp; ❤️
        </footer>

      </main>

    </div>
  );
}

export default Dashboard;