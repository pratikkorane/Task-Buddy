import React, { useState } from "react";

const TaskerListHorizontal = () => {
  const taskers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+91 7890561234",
      service: "Sofa Cleaning",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Brown",
      email: "bob@example.com",
      phone: "+91 7890565678",
      service: "Intense Cleaning",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Davis",
      email: "charlie@example.com",
      phone: "+91 7890569123",
      service: "Men Haircutting",
      status: "Active",
    },
    {
      id: 4,
      name: "Diana Lee",
      email: "diana@example.com",
      phone: "+91 7890563456",
      service: "Bathroom Cleaning",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Evan White",
      email: "evan@example.com",
      phone: "+91 7890567890",
      service: "Geyser Service",
      status: "Active",
    },
    {
      id: 6,
      name: "Fiona Green",
      email: "fiona@example.com",
      phone: "+91 7890562345",
      service: "Door Lock Repairing",
      status: "Inactive",
    },
  ];

  const [taskerStatuses, setTaskerStatuses] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const toggleStatus = (taskerId) => {
    const currentStatus =
      taskerStatuses[taskerId] || taskers.find((t) => t.id === taskerId).status;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    setTaskerStatuses({
      ...taskerStatuses,
      [taskerId]: newStatus,
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query
  };

  // Filter taskers based on search query
  const filteredTaskers = taskers.filter(
    (tasker) =>
      tasker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tasker.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tasker.phone.includes(searchQuery) ||
      tasker.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Tasker List</h2>

      {/* Search bar */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by name, email, phone, or service"
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
            <th>Service</th>
            <th style={{ width: "150px" }}>Status</th>{" "}
            {/* Fixed width for Status column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTaskers.map((tasker) => (
            <tr key={tasker.id}>
              <td>{tasker.id}</td>
              <td>{tasker.name}</td>
              <td>{tasker.email}</td>
              <td>{tasker.phone}</td>
              <td>{tasker.service}</td>
              <td>{taskerStatuses[tasker.id] || tasker.status}</td>
              <td>
                <button
                  style={{ width: "100px" }} // Ensure consistent width for buttons
                  className={`btn btn-block ${
                    (taskerStatuses[tasker.id] || tasker.status) === "Active"
                      ? "btn-danger"
                      : "btn-success"
                  }`}
                  onClick={() => toggleStatus(tasker.id)}
                >
                  {(taskerStatuses[tasker.id] || tasker.status) === "Active"
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

export default TaskerListHorizontal;
