import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="admin-page">

      {/* Sidebar */}
      <aside className="admin-sidebar">

        <div className="sidebar-logo">
          <span>❤️</span>
          <h2>BloodConnect</h2>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-nav">
          <Link to="/admin" className="active">
            🏠 Dashboard
          </Link>

          <Link to="/admin-users">
            👥 User Management
          </Link>

          <Link to="/admin-donors">
            🩸 Donor Management
          </Link>

          <Link to="/admin-requests">
            📋 Blood Requests
          </Link>

          <Link to="/">
            🌐 Visit Website
          </Link>
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          ↪ Logout
        </button>

      </aside>

      {/* Main Dashboard */}
      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <h2>Admin Dashboard</h2>
            <p>BloodConnect Management System</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">👤</div>
            <div>
              <h4>Administrator</h4>
              <span>Super Admin</span>
            </div>
          </div>
        </header>

        {/* Welcome */}
        <section className="welcome-banner">
          <div>
            <span className="welcome-tag">ADMIN CONTROL PANEL</span>

            <h1>Welcome Back, Admin! 👋</h1>

            <p>
              Manage donors, users and blood requests.
              Together, let's make every drop count.
            </p>

            <Link to="/admin-users" className="welcome-button">
              Manage Platform →
            </Link>
          </div>

          <div className="welcome-image">
            🩸
          </div>
        </section>

        {/* Statistics */}
        <section className="dashboard-section">

          <div className="section-heading">
            <div>
              <h2>Dashboard Overview</h2>
              <p>Manage your platform activities</p>
            </div>
          </div>

          <div className="admin-cards">

            <div className="dashboard-card users-card">
              <div className="card-top">
                <div className="card-icon">👥</div>
                <span className="card-label">USER MANAGEMENT</span>
              </div>

              <h2>Total Users</h2>
              <p>View and manage registered users.</p>

              <Link to="/admin-users">
                Manage Users →
              </Link>
            </div>

            <div className="dashboard-card donors-card">
              <div className="card-top">
                <div className="card-icon">🩸</div>
                <span className="card-label">DONOR MANAGEMENT</span>
              </div>

              <h2>Blood Donors</h2>
              <p>View and manage registered donors.</p>

              <Link to="/admin-donors">
                Manage Donors →
              </Link>
            </div>

            <div className="dashboard-card requests-card">
              <div className="card-top">
                <div className="card-icon">📋</div>
                <span className="card-label">REQUEST MANAGEMENT</span>
              </div>

              <h2>Blood Requests</h2>
              <p>Review and manage blood requests.</p>

              <Link to="/admin-requests">
                Manage Requests →
              </Link>
            </div>

          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-section">

          <h2>Quick Actions ⚡</h2>
          <p>Access important management pages quickly.</p>

          <div className="quick-grid">

            <Link to="/admin-users">
              <span>👥</span>
              <div>
                <h3>View Users</h3>
                <p>Manage registered users</p>
              </div>
              <b>→</b>
            </Link>

            <Link to="/admin-donors">
              <span>🩸</span>
              <div>
                <h3>View Donors</h3>
                <p>Manage blood donors</p>
              </div>
              <b>→</b>
            </Link>

            <Link to="/admin-requests">
              <span>📋</span>
              <div>
                <h3>View Requests</h3>
                <p>Manage blood requests</p>
              </div>
              <b>→</b>
            </Link>

          </div>
        </section>

        {/* Footer */}
        <footer className="admin-footer">
          <p>
            © 2026 BloodConnect | Donate Blood, Save Lives ❤️
          </p>
        </footer>

      </main>
    </div>
  );
}

export default Admin;