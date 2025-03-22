import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";

const CompletedTasks = () => {
  // Tasker data array
  const [tasks] = useState([
    {
      id: 1,
      name: "John Doe",
      category: "Plumbing",
      task: "Fix Pipe",
      phone: "123-456-7890",
    },
    {
      id: 2,
      name: "Jane Smith",
      category: "Electrician",
      task: "Repair Socket",
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Mike Johnson",
      category: "Cleaning",
      task: "Clean Room",
      phone: "456-789-1234",
    },
    {
      id: 4,
      name: "Emily Davis",
      category: "Gardening",
      task: "Trim Lawn",
      phone: "321-654-9870",
    },
  ]);

  // State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      {/* Heading */}
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
          <h2>Completed Task List</h2>
        </div>

        {/* Search Bar */}
        <div className="mb-3 d-flex ">
          <input
            type="text"
            className="form-control ml-auto w-25"
            placeholder="Search Tasker by Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          />
        </div>

        {/* Tasker List */}
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
                to={`/taskerProfile/${task.id}`}
                key={task.id}
                className="text-decoration-none"
              >
                <li key={task.id} className="list-group-item d-flex">
                  <div className="col">{task.id}</div>
                  <div className="col">{task.name}</div>
                  <div className="col">{task.category}</div>
                  <div className="col">{task.task}</div>
                  <div className="col">{task.phone}</div>
                </li>
              </Link>
            ))
          ) : (
            <li className="list-group-item text-center">No Taskers Found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CompletedTasks;
