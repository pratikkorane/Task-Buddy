import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar";
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useNavigate } from "react-router-dom";


const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchCompletedTasks = async () => {
    try {
      debugger;
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/tasker/login"); // Redirect if no token
        return;
      }

      // Decode the token to get taskerIdss
      const decoded = jwtDecode(token);
      const taskerId = decoded.TaskerId;

      const response = await fetch(`http://localhost:5286/api/Tasker/${taskerId}/completed-tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setCompletedTasks(data.$values); // Assuming $values contains the array of tasks
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading completed tasks...</div>;
  }

  if (error) {
    return <div className="text-center text-danger mt-4">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Completed Tasks</h2>
      <div className="card">
        <div className="card-header bg-dark text-light">
          <h5>Task List</h5>
        </div>
        <div className="card-body">
          {completedTasks.length > 0 ? (
            <ul className="list-group list-group-flush">
              {completedTasks.map((task) => (
                <li key={task.taskId} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5>{task.taskTitle}</h5>
                      <p className="mb-1">
                        <strong>Customer:</strong> {task.customerName}
                      </p>
                      <p className="mb-1">
                        <strong>Address:</strong> {task.address}
                      </p>
                      <p className="mb-1">
                        <strong>Status:</strong> {task.status}
                      </p>
                      <p className="mb-0">
                        <strong>Completion Date:</strong> {task.completionDate}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No completed tasks at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedTasks;
