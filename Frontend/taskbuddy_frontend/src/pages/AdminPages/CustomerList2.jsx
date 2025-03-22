

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const CustomerList2 = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch customers from backend
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://localhost:5286/api/admins/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  const toggleStatus = (customerId) => {
    axios
      .put(`http://localhost:5286/api/admins/toggle-customer-status/${customerId}`)
      .then(() => {
        // Update status locally without refreshing
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.customerId === customerId
              ? { ...customer, status: customer.status === "Active" ? "Inactive" : "Active" }
              : customer
          )
        );
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div>
      <Navbar />
    
    <div className="container mt-4">
      
      <h2 className="text-center mb-4">Customer List</h2>

      {/* Search Bar */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th style={{ width: "150px" }}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.customerId}>
              <td>{customer.customerId}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.status}</td>
              <td>
                <button
                  className={`btn ${customer.status === "Active" ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleStatus(customer.customerId)}
                  style={{ width: "100px" }}
                >
                  {customer.status === "Active" ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default CustomerList2;
