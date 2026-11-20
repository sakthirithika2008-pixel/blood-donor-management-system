import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./AdminRequests.css";
import "./AdminNotifications.css";

function AdminRequests() {
const [requests, setRequests] = useState([]);
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");
const [toast, setToast] = useState(null);

const timerRef = useRef(null);

const showToast = (text, type = "success") => {
setToast({
text: text,
type: type
});

if (timerRef.current) {
  clearTimeout(timerRef.current);
}

timerRef.current = setTimeout(() => {
  setToast(null);
}, 3000);

};

useEffect(() => {
return () => {
if (timerRef.current) {
clearTimeout(timerRef.current);
}
};
}, []);

const fetchRequests = async () => {
try {
const response = await fetch(
"http://127.0.0.1:5000/api/admin/requests"
);

  const data = await response.json();

  if (!response.ok) {
    setMessage(data.message || "Failed to load requests");
    return;
  }

  setRequests(data);
  setMessage("");

} catch (error) {
  setMessage("Cannot connect to backend!");
} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchRequests();
}, []);

const updateStatus = async (id, status) => {
try {
const response = await fetch(
"http://127.0.0.1:5000/api/admin/requests/" + id,
{
method: "PATCH",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
status: status
})
}
);

  const data = await response.json();

  if (!response.ok) {
    showToast(
      data.message || "Update failed",
      "error"
    );
    return;
  }

  showToast(
    "Request " + status + " successfully!",
    "success"
  );

  await fetchRequests();

} catch (error) {
  showToast(
    "Cannot connect to backend!",
    "error"
  );
}

};

return (
<div className="admin-requests-page">

  <header className="admin-requests-header">
    <h1>🩸 Blood Request Management</h1>

    <Link to="/admin">
      Back to Admin Dashboard
    </Link>
  </header>

  <div className="admin-requests-content">

    <h2>All Blood Requests</h2>

    {loading && (
      <p>Loading requests...</p>
    )}

    {message && (
      <p>{message}</p>
    )}

    {!loading && requests.length === 0 && (
      <p>No blood requests found.</p>
    )}

    <div className="admin-request-list">

      {requests.map((request) => (

        <div
          className="admin-request-card"
          key={request._id}
        >

          <h3>
            Patient: {request.patientName}
          </h3>

          <p>
            <strong>Blood Group:</strong>{" "}
            {request.bloodGroup}
          </p>

          <p>
            <strong>Hospital:</strong>{" "}
            {request.hospital}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {request.location}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {request.phone}
          </p>

          <p>
            <strong>Units Required:</strong>{" "}
            {request.units}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {request.status || "Pending"}
          </p>

          <div className="admin-request-buttons">

            <button
              onClick={() =>
                updateStatus(request._id, "Approved")
              }
            >
              Approve
            </button>

            <button
              onClick={() =>
                updateStatus(request._id, "Rejected")
              }
            >
              Reject
            </button>

            <button
              onClick={() =>
                updateStatus(request._id, "Pending")
              }
            >
              Pending
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

  {toast && (
    <div className={"bc-toast " + toast.type}>

      <span>
        {toast.type === "success" ? "✓" : "✕"}
      </span>

      {toast.text}

    </div>
  )}

</div>

);
}

export default AdminRequests;