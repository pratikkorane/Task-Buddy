
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

const ActiveTaskersList2 = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveTasks();
  }, []);

  const fetchActiveTasks = () => {
    axios
      .get("http://localhost:5286/api/admins/active-tasks")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching active tasks:", error);
        setLoading(false);
      });
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.taskerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
          <h2>Active Task List</h2>
        </div>

        {/* Search Bar */}
        <div className="mb-3 d-flex">
          <input
            type="text"
            className="form-control ml-auto w-25"
            placeholder="Search Tasker by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center">Loading active tasks...</p>
        ) : (
          <ul className="list-group list-group-flush">
            {/* Header Row */}
            <li className="list-group-item d-flex">
              <div className="col fw-bold">ID</div>
              <div className="col fw-bold">Name</div>
              <div className="col fw-bold">Category</div>
              <div className="col fw-bold">Task</div>
              <div className="col fw-bold">Phone</div>
            </li>

            {/* Task Rows */}
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Link
                  to={`/taskerProfile/${task.taskerId}`}
                  key={task.taskId}
                  className="text-decoration-none"
                >
                  <li className="list-group-item d-flex">
                    <div className="col">{task.taskId}</div>
                    <div className="col">{task.taskerName}</div>
                    <div className="col">{task.category}</div>
                    <div className="col">{task.taskTitle}</div>
                    <div className="col">{task.phone}</div>
                  </li>
                </Link>
              ))
            ) : (
              <li className="list-group-item text-center">No Active Tasks Found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActiveTaskersList2;