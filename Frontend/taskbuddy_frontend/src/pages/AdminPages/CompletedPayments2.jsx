
import React, { useState, useEffect } from "react";
import axios from "axios";

// Utility function to filter completed payments based on date range
const filterPayments = (payments, range) => {
  const today = new Date();
  let filteredPayments = [];

  switch (range) {
    case "last-week":
      const lastWeek = new Date(today);
      lastWeek.setDate(today.getDate() - 7);
      filteredPayments = payments.filter((payment) => new Date(payment.paymentDate) >= lastWeek);
      break;
    case "last-month":
      const lastMonth = new Date(today);
      lastMonth.setMonth(today.getMonth() - 1);
      filteredPayments = payments.filter((payment) => new Date(payment.paymentDate) >= lastMonth);
      break;
    case "last-3-months":
      const last3Months = new Date(today);
      last3Months.setMonth(today.getMonth() - 3);
      filteredPayments = payments.filter((payment) => new Date(payment.paymentDate) >= last3Months);
      break;
    case "this-year":
      const startOfYear = new Date(today.getFullYear(), 0, 1);
      filteredPayments = payments.filter((payment) => new Date(payment.paymentDate) >= startOfYear);
      break;
    default:
      filteredPayments = payments; // Show all payments if no filter is selected
  }

  return filteredPayments;
};

const CompletedPayments2 = () => {
  const [completedPayments, setCompletedPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState("all-time");

  useEffect(() => {
    // Fetch completed payments from backend
    axios
      .get("http://localhost:5286/api/admins/completed-payments")
      .then((response) => {
        setCompletedPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching completed payments:", error);
        setLoading(false);
      });
  }, []);

  // Apply filter to the completed payments
  const filteredPayments = filterPayments(completedPayments, filterRange);

  if (loading) {
    return (
      <div className="container mt-4 d-flex justify-content-center">
        <div className="col-md-6 p-4 border rounded shadow bg-white">
          <h2 className="text-center">Completed Payments</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="col-md-8 p-4 border rounded shadow bg-white">
        <h2 className="text-center">Completed Payments</h2>

        {/* Filter Options */}
        <div className="mb-4">
          <label htmlFor="filterRange" className="form-label">
            Filter by Time Range:
          </label>
          <select
            id="filterRange"
            className="form-select"
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
          >
            <option value="all-time">All Time</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>

        {/* Completed Payments Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer Name</th>
              <th>Tasker Name</th>
              <th>Payment Amount ($)</th>
              <th>Payment Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.transactionId}>
                  <td>{payment.transactionId}</td>
                  <td>{payment.customerName}</td>
                  <td>{payment.taskerName}</td>
                  <td>{payment.paymentAmount}</td>
                  <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                  <td>{payment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No completed payments found for the selected range.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedPayments2;
