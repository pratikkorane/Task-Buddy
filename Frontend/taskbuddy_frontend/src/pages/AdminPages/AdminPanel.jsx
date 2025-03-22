import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <div>
        <Navbar></Navbar>
      </div>
      <h1 className="mb-4 text-center  mt-5"> Admin Panel</h1>

      <div className="container">
        {/* Admin Dashboard Overview */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center bg-info text-light">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text fs-4">1,245</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-success text-light">
              <div className="card-body">
                <h5 className="card-title">Total Taskers</h5>
                <p className="card-text fs-4">345</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-warning text-dark">
              <div className="card-body">
                <h5 className="card-title">Active Tasks</h5>
                <p className="card-text fs-4">78</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center bg-danger text-light">
              <div className="card-body">
                <h5 className="card-title">Pending Payments</h5>
                <p className="card-text fs-4">$12,435</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Management Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>User Management</h5>
          </div>
          <div className="card-body">
            <p>View and manage registered users and taskers:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/admin/viewCutomer")}
                  className="text-decoration-none text-primary"
                >
                  View Customers
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/admin/takserListHori")}
                  className="text-decoration-none text-primary"
                >
                  View Taskers
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Task Management</h5>
          </div>
          <div className="card-body">
            <p>Manage ongoing and completed tasks:</p>
            <ul>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/admin/taskersList")}
                  className="text-decoration-none text-primary"
                >
                  View Active Tasks
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/admin/completedTask")}
                  className="text-decoration-none text-primary"
                >
                  View Completed Tasks
                </a>
              </li>
              <li>
                <a
                  href=""
                  onClick={() => navigate("/admin/categoryForm")}
                  className="text-decoration-none text-primary"
                >
                  Add Cataegory
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
            <p>Manage payments and track transactions:</p>
            <ul>
              <li>
                <a
                  href="/admin/pending-payments"
                  className="text-decoration-none text-primary"
                >
                  View Pending Payments
                </a>
              </li>
              <li>
                <a
                  href="/admin/transactions"
                  className="text-decoration-none text-primary"
                >
                  View All Transactions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Feedback & Analytics Section */}
        <div className="card mb-4">
          <div className="card-header bg-dark text-light">
            <h5>Feedback & Analytics</h5>
          </div>
          <div className="card-body">
            <p>Monitor user feedback and site analytics:</p>
            <ul>
              <li>
                <a
                  href="/admin/feedback"
                  className="text-decoration-none text-primary"
                >
                  View User Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
