import React, { useState, useEffect } from 'react';
import './adminpanel.css'; // Custom CSS for the unique admin panel
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/login');
    } else {
      setUserData({ username: 'Admin User' });
    }
  }, [navigate]);

  return (
    <div className="unique-admin-panel-container">
      <div className="unique-admin-panel-sidebar">
        <div className="unique-admin-panel-logo">Admin Dashboard</div>
        <ul className="unique-admin-panel-menu">
          <li className="unique-admin-panel-menu-item">Dashboard</li>
          <li
            className="unique-admin-panel-menu-item"
            onClick={() => navigate('/adminblog')}
          >
            Add Blog
          </li>
          <li
            className="unique-admin-panel-menu-item"
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/home');
            }}
          >
            Logout
          </li>
        </ul>
      </div>
      <div className="unique-admin-panel-main-content">
        <div className="unique-admin-panel-header">
          <h1>Welcome, {userData ? userData.username : 'Loading...'}</h1>
        </div>
        <div className="unique-admin-panel-dashboard">
          <div className="unique-admin-panel-card">
            <div className="unique-admin-panel-card-header">Total Users</div>
            <div className="unique-admin-panel-card-body">150</div>
          </div>
          <div className="unique-admin-panel-card">
            <div className="unique-admin-panel-card-header">Active Sessions</div>
            <div className="unique-admin-panel-card-body">34</div>
          </div>
          <div className="unique-admin-panel-card">
            <div className="unique-admin-panel-card-header">Messages</div>
            <div className="unique-admin-panel-card-body">22</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;