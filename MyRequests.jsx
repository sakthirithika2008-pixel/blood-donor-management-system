import React, { useEffect, useState } from "react";
import "./MyRequests.css";

function MyRequest() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const getLoggedInUser = () => {
    const possibleKeys = [
      "user",
      "loggedInUser",
      "currentUser",
      "userData",
      "bloodConnectUser"
    ];

    for (const key of possibleKeys) {
      try {
        const savedUser = localStorage.getItem(key);

        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);

          if (parsedUser.id || parsedUser._id) {
            return parsedUser;
          }
        }
      } catch (error) {
        console.error("User data error:", error);
      }
    }

    return null;
  };

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const user = getLoggedInUser();

      if (!user) {
        setError("Please login to view your requests.");
        return;
      }

      const userId = user.id || user._id;

      const response = await fetch(
        `http://localhost:5000/api/requests/${userId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests(data);

    } catch (error) {
      console.error("My Request Error:", error);
      setError("Unable to load your requests.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-pending";
    }
  };

  return (
    <div className="my-request-page">

      <div className="my-request-header">
        <h1>My Blood Requests</h1>
        <p>Track your blood requests and their current status.</p>
      </div>

      {loading && (
        <p className="my-request-message">
          Loading your requests...
        </p>
      )}

      {error && (
        <p className="my-request-error">
          {error}
        </p>
      )}

      {!loading && !error && requests.length === 0 && (
        <div className="empty-request">
          <h2>No Requests Found</h2>
          <p>You have not submitted any blood requests yet.</p>
        </div>
      )}

      {!loading && requests.length > 0 && (
        <div className="my-request-container">

          {requests.map((request) => (
            <div className="my-request-card" key={request._id}>

              <div className="request-card-top">
                <div className="request-blood-group">
                  {request.bloodGroup}
                </div>

                <span className={`request-status ${getStatusClass(request.status)}`}>
                  {request.status || "Pending"}
                </span>
              </div>

              <h2>{request.patientName}</h2>

              <div className="request-details">
                <p>
                  <strong>Hospital:</strong> {request.hospital}
                </p>

                <p>
                  <strong>Location:</strong> {request.location}
                </p>

                <p>
                  <strong>Contact:</strong> {request.phone}
                </p>

                <p>
                  <strong>Required Units:</strong> {request.units}
                </p>

                <p>
                  <strong>Request Date:</strong>{" "}
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default MyRequest;