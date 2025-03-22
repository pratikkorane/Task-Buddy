import React, { useState } from "react";

const CustomerList = () => {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 4890955212",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+91 5890955223",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam@example.com",
      phone: "+91 9890955220",
      status: "Active",
    },
  ];

  const [customerStatuses, setCustomerStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const toggleStatus = (customerId) => {
    // Toggle status and update state
    const currentStatus =
      customerStatuses[customerId] ||
      customers.find((c) => c.id === customerId).status;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    setCustomerStatuses({
      ...customerStatuses,
      [customerId]: newStatus,
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Customer List</h2>

      {/* Search bar on right side */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by name, email, or phone"
          value={searchQuery}
          onChange={handleSearch}
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
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customerStatuses[customer.id] || customer.status}</td>
              <td>
                <button
                  className={`btn btn-block ${
                    (customerStatuses[customer.id] || customer.status) ===
                    "Active"
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                  onClick={() => toggleStatus(customer.id)}
                  style={{ width: "100px" }}
                >
                  {(customerStatuses[customer.id] || customer.status) ===
                  "Active"
                    ? "Block"
                    : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
