
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";

const TaskerListHorizontal2 = () => {
  const [taskers, setTaskers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch taskers from backend
  useEffect(() => {
    fetchTaskers();
  }, []);

  const fetchTaskers = () => {
    axios
      .get("http://localhost:5286/api/admins/taskers")
      .then((response) => {
        setTaskers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching taskers:", error);
      });
  };

  const toggleStatus = (taskerId) => {
    axios
      .put(`http://localhost:5286/api/admins/toggle-tasker-status/${taskerId}`)
      .then(() => {
        // Update status locally without refreshing
        setTaskers((prevTaskers) =>
          prevTaskers.map((tasker) =>
            tasker.taskerId === taskerId
              ? { ...tasker, status: tasker.status === "Active" ? "Inactive" : "Active" }
              : tasker
          )
        );
      })
      .catch((error) => {
        console.error("Error updating tasker status:", error);
      });
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

    <div>
      <Navbar />
 

    <div className="container mt-4">
      <h2 className="text-center mb-4">Tasker List</h2>

      {/* Search Bar */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by name, email, phone, or service"
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
            <th>Service</th>
            <th style={{ width: "150px" }}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTaskers.map((tasker) => (
            <tr key={tasker.taskerId}>
              <td>{tasker.taskerId}</td>
              <td>{tasker.name}</td>
              <td>{tasker.email}</td>
              <td>{tasker.phone}</td>
              <td>{tasker.service}</td>
              <td>{tasker.status}</td>
              <td>
                <button
                  style={{ width: "100px" }} // Ensure consistent width for buttons
                  className={`btn ${
                    tasker.status === "Active" ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => toggleStatus(tasker.taskerId)}
                >
                  {tasker.status === "Active" ? "Block" : "Unblock"}
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

export default TaskerListHorizontal2;
