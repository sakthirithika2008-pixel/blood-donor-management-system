import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/admin/users"
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load users");
        return;
      }

      setUsers(data);
    } catch (error) {
      setMessage("Cannot connect to backend!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/admin/users/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Delete failed");
        return;
      }

      alert("User deleted successfully!");

      fetchUsers();
    } catch (error) {
      alert("Cannot connect to backend!");
    }
  };

  return (
    <div className="admin-users-page">

      <header className="admin-users-header">
        <h1>👥 User Management</h1>

        <Link to="/admin">
          Back to Admin Dashboard
        </Link>
      </header>

      <div className="admin-users-content">

        <div className="users-title-row">
          <h2>Registered Users ({users.length})</h2>

          <button onClick={fetchUsers}>
            🔄 Refresh
          </button>
        </div>

        {loading && <p>Loading users...</p>}

        {message && <p className="users-message">{message}</p>}

        {!loading && users.length === 0 && !message && (
          <p>No registered users found.</p>
        )}

        <div className="admin-users-list">

          {users.map((user) => (
            <div className="admin-user-card" key={user._id}>

              <h3>👤 {user.name}</h3>

              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p>
                <strong>Phone:</strong> {user.phone}
              </p>

              <p>
                <strong>Blood Group:</strong> {user.bloodGroup}
              </p>

              <button
                className="delete-user-btn"
                onClick={() => deleteUser(user._id)}
              >
                🗑️ Delete User
              </button>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default AdminUsers;