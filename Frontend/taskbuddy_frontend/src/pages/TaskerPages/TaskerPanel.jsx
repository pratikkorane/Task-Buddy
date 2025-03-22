import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
// import { jwt_decode } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode'; // Correct import
import React, { useEffect, useState } from "react";

const TaskerPanel = () => {
  const navigate = useNavigate();

/////////////////////////////////////////////////////////////


// State to hold tasker data
const [taskerStats, setTaskerStats] = useState({
  completedTasks: 0,
  pendingRequests: 0,
  pendingTasks: 0,
  earnings: 0,
});

// Fetch tasker-specific data
useEffect(() => {
  const fetchData = async () => {
    try {
      debugger ; 
      // Get JWT token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/tasker/login"); // Redirect if no token
        return;
      }

      // Decode the token to get taskerId
      const decoded = jwtDecode(token);
      const taskerId = decoded.TaskerId;

      // API call to fetch stats for the tasker
      const response = await fetch(
        `http://localhost:5286/api/tasker/stats/${taskerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch tasker stats.");
      }

      const data = await response.json();
      setTaskerStats({
        completedTasks: data.totalTasksCompleted,
        pendingRequests: data.pendingRequests,
        pendingTasks: data.pendingTasks,
        earnings: data.earningsPerMonth,
      });
    } catch (error) {
      console.error("Error fetching tasker data:", error);
      navigate("/tasker/login"); // Redirect to login on error
    }
  };

  fetchData();
}, [navigate]);







/////////////////////////////////////////////////////////////////////////
 

return (
    <div className="">
      <div>
        <Navbar></Navbar>
      </div>
      <h1 className="mb-4 text-center mt-5">Tasker Panel</h1>

      <div className="container">
        {/* Tasker Dashboard Overview */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center bg-info text-light">
              <div className="card-body">
                <h5 className="card-title">Total Tasks Completed</h5>
                <p className="card-text fs-4">{taskerStats.completedTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-success text-light">
              <div className="card-body">
                <h5 className="card-title">Pending Request</h5>
                <p className="card-text fs-4">{taskerStats.pendingRequests}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Pending Tasks</h5>
                <p className="card-text fs-4">{taskerStats.pendingTasks}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-danger text-light">
              <div className="card-body">
                <h5 className="card-title">Per Month Earnings</h5>
                <p className="card-text fs-4">₹{taskerStats.earnings}</p>
              </div>
            </div>
          </div>
        </div>

        {/* My Tasks Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>My Tasks</h5>
          </div>
          <div className="card-body">
            <p>Manage your assigned tasks:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/activeTasks")}
                  className="text-decoration-none text-primary"
                >
                  View Active Tasks
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/completedTasks")}
                  className="text-decoration-none text-primary"
                >
                  View Completed Tasks
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Management Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Profile Management</h5>
          </div>
          <div className="card-body">
            <p>Manage your profile and update personal information:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/editProfile")}
                  className="text-decoration-none text-primary"
                >
                  Edit Profile
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/viewRatings")}
                  className="text-decoration-none text-primary"
                >
                  View Ratings and Reviews
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Management Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Payment Management</h5>
          </div>
          <div className="card-body">
            <p>Track your earnings and manage payment details:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/paymentHistory")}
                  className="text-decoration-none text-primary"
                >
                  View Payment History
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Support</h5>
          </div>
          <div className="card-body">
            <p>Need help or have questions? Contact support:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/support")}
                  className="text-decoration-none text-primary"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/tasker/faqs")}
                  className="text-decoration-none text-primary"
                >
                  View FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerPanel;
