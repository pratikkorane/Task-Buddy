import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useNavigate } from "react-router-dom";

const ActiveTasks = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchActiveTasks = async () => {
    try {
      debugger ; 
const token = localStorage.getItem("token");
      if (!token) {
        navigate("/tasker/login"); // Redirect if no token
        return;
      }

      // Decode the token to get taskerId
      const decoded = jwtDecode(token);
      const taskerId = decoded.TaskerId;
      const response = await fetch(`http://localhost:5286/api/Tasker/${taskerId}/active-tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setActiveTasks(data.$values);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Active Tasks</h2>
        <div className="card">
          <div className="card-header bg-dark text-light">
            <h5>Task List</h5>
          </div>
          <div className="card-body">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">Error: {error}</p>
            ) : activeTasks.length > 0 ? (
              <ul className="list-group">
                {activeTasks.map((task) => (
                  <li
                    key={task.taskId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <h5>{task.taskTitle}</h5>
                      <p className="mb-1">
                        <strong>Customer:</strong> {task.customerName}
                      </p>
                      <p className="mb-1">
                        <strong>Address:</strong> {task.address}
                      </p>
                      <p className="mb-0">
                        <strong>Status:</strong> {task.status}
                      </p>
                      <p className="mb-0">
                        <strong>Start Date:</strong> {task.startDate}
                      </p>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-success btn-sm">
                        Mark as Completed
                      </button>
                      <button className="btn btn-primary btn-sm">
                        View Details
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No active tasks at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveTasks;
