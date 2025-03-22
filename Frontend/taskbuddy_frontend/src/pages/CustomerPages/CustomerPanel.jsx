import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const CustomerPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookings, setBookings] = useState([
    {
      taskTitle: "Car Moving",
      taskerName: "Mike Johnson",
      dateTime: "2025-01-25, 10:00 AM",
      status: "Completed",
      paymentStatus: "Paid",
    },
    {
      taskTitle: "Furniture Delivery",
      taskerName: "Sarah Lee",
      dateTime: "2025-01-27, 02:00 PM",
      status: "Pending",
      paymentStatus: "Unpaid",
    },
  ]);

  const [notifications, setNotifications] = useState([
    {
      message: "Upcoming Task: Furniture Delivery - 2025-01-27, 02:00 PM",
    },
    {
      message: "Task Confirmation: Car Moving - 2025-01-25, 10:00 AM",
    },
    {
      message: "Payment Received: Car Moving - ₹3,000",
    },
  ]);

  const navigate = useNavigate();

  const handleExpandBookings = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <h1 className="mb-4 text-center mt-5">Customer Panel</h1>

      <div className="container">
        {/* Customer Dashboard Overview */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center bg-info text-light">
              <div className="card-body">
                <h5 className="card-title">Total Tasks Booked</h5>
                <p className="card-text fs-4">20</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-success text-light">
              <div className="card-body">
                <h5 className="card-title">Upcoming Tasks</h5>
                <p className="card-text fs-4">5</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Pending Requests</h5>
                <p className="card-text fs-4">2</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-danger text-light">
              <div className="card-body">
                <h5 className="card-title">Total Spent</h5>
                <p className="card-text fs-4">₹8,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Profile Section</h5>
          </div>
          <div className="card-body">
            <p>Manage your personal information:</p>
            <ul>
              <li><strong>Full Name:</strong> John Doe</li>
              <li><strong>Email Address:</strong> johndoe@email.com</li>
              <li><strong>Phone Number:</strong> +1 234 567 890</li>
              <li><strong>Profile Picture:</strong> <img src="profile.jpg" alt="Profile" style={{ width: "50px", height: "50px" }} /></li>
            </ul>
            <a
              href=""
              onClick={() => navigate("/Customer/CustomerEditProfile")}
              className="text-decoration-none text-primary"
            >
              Edit Profile
            </a>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Booking History</h5>
          </div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Tasker Name</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.taskTitle}</td>
                    <td>{booking.taskerName}</td>
                    <td>{booking.dateTime}</td>
                    <td>{booking.status}</td>
                    <td>{booking.paymentStatus}</td>
                  </tr>
                ))}
                {isExpanded && (
                  <>
                    <tr>
                      <td>Task 3</td>
                      <td>John Smith</td>
                      <td>2025-02-01, 01:00 PM</td>
                      <td>Completed</td>
                      <td>Paid</td>
                    </tr>
                    <tr>
                      <td>Task 4</td>
                      <td>Amy Adams</td>
                      <td>2025-02-05, 03:00 PM</td>
                      <td>Pending</td>
                      <td>Unpaid</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            <button
              onClick={handleExpandBookings}
              className="btn btn-link"
            >
              {isExpanded ? "View Less Bookings" : "View More Bookings"}
            </button>
          </div>
        </div>

       

        {/* Notifications Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Notifications</h5>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {notifications.map((notification, index) => (
                <li className="list-group-item" key={index}>
                  {notification.message}
                </li>
              ))}
            </ul>
            <a
              href=""
              onClick={() => navigate("/customer/notifications")}
              className="text-decoration-none text-primary"
            >
              View All Notifications
            </a>
          </div>
        </div>

         {/* Book Tasker Button */}
         <div className="card mb-4 text-center">
          <div className="card-body">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary"
            >
              Book a Tasker
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPanel;
