import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const TaskerList2 = () => {
  const navigate = useNavigate();
  const { service } = useParams(); // Get service from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTaskers, setFilteredTaskers] = useState([]);
  const [taskers, setTaskers] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Search Tasker");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskers = async () => {
      setLoading(true);
      try {
        // Send service name (like "sofa") to the backend
        const response = await axios.get(`http://localhost:5286/api/home/taskers/${service}`);
        setTaskers(response.data);  // Store the taskers in the state
        setFilteredTaskers(response.data);  // Filtered taskers
      } catch (err) {
        setError("Failed to fetch taskers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTaskers();
  
    // Change placeholder text when a specific task is selected
    if (service) {
      setPlaceholderText("Search Tasker");
    } else {
      setPlaceholderText("Search Task");
    }
  }, [service]); // Runs whenever 'service' changes
  
  // Filter taskers based on search term
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = taskers.filter(
      (tasker) =>
        tasker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tasker.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tasker.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTaskers(filtered);
  };

  // Prevent rendering if there's an error
  if (error) {
    return (
      <div>
        <Navbar onSearch={handleSearch} placeholderText={placeholderText} />
        <div className="container my-5">
          <div className="alert alert-danger">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar onSearch={handleSearch} placeholderText={placeholderText} />
      <div className="container my-5">
        <h2 className="text-center mb-4">Tasker List for {service}</h2>

        {/* Display loading state */}
        {loading && <div className="text-center">Loading...</div>}

        {/* Display tasker cards */}
        {!loading && !error && (
          <div className="row">
            {filteredTaskers.length === 0 ? (
              <div className="col-12">
                <p>No taskers available for this service.</p>
              </div>
            ) : (
              filteredTaskers.map((tasker) => (
                <div className="col-md-6 col-lg-4 mb-4" key={tasker.taskerId}>
                  <div className="card h-100">
                    <div className="card-body d-flex align-items-center">
                      <div className="me-3">
                        <img
                          src="https://via.placeholder.com/100"
                          alt={`${tasker.name} Profile`}
                          className="rounded-circle"
                          width="60"
                          height="60"
                        />
                      </div>
                      <div>
                        <h5 className="card-title mb-1">{tasker.name}</h5>
                        {/* <p className="text-muted mb-1">
                          {tasker.taskCategory?.categoryName || "No Category"}
                        </p> */}
                        <p className="mb-1">
                          <strong>Location:</strong> {tasker.address}
                        </p>
                        <p className="mb-1">
                          <strong>Email:</strong> {tasker.email}
                        </p>
                        <p className="mb-1">
                          <strong>Phone:</strong> {tasker.phone}
                        </p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/taskerProfile/${tasker.taskerId}`)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskerList2;
