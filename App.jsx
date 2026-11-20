import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Home";
import Login from "./login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import DonorSearch from "./DonorSearch";
import DonorDetails from "./DonorDetails";
import BloodRequest from "./BloodRequest";
import MyRequests from "./MyRequests";

import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import AdminUsers from "./AdminUsers";
import AdminDonors from "./AdminDonors";
import AdminRequests from "./AdminRequests";

function App() {
return (
<BrowserRouter>
<Routes>
{/* Home Page */}
<Route path="/" element={<Home />} />
<Route path="/home" element={<Home />} />

    {/* User Pages */}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/profile" element={<Profile />} />

    {/* Donor Pages */}
    <Route path="/donors" element={<DonorSearch />} />
    <Route path="/donor-details" element={<DonorDetails />} />

    {/* Blood Request Pages */}
    <Route path="/blood-request" element={<BloodRequest />} />
    <Route path="/my-requests" element={<MyRequests />} />

    {/* Admin Pages */}
    <Route path="/admin-login" element={<AdminLogin />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/admin-users" element={<AdminUsers />} />
    <Route path="/admin-donors" element={<AdminDonors />} />
    <Route path="/admin-requests" element={<AdminRequests />} />

    {/* Invalid URL */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</BrowserRouter>

);
}

export default App;