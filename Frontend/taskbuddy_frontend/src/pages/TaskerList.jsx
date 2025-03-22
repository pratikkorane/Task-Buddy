// import React from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar";

// const TaskerList = () => {
//   const navigate = useNavigate();
//   const { service } = useParams(); // Get service from URL

//   const taskers = [
//     {
//       id: 1,
//       name: "John Doe",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Door Lock Repairing",
//       location: "New York, NY",
//       hourlyRate: "150/hr",
//       rating: 4.8,
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Geyser Service",
//       location: "Los Angeles, CA",
//       hourlyRate: "200/hr",
//       rating: 4.5,
//     },
//     {
//       id: 3,
//       name: "Tom Brown",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Bathroom Cleaning",
//       location: "Chicago, IL",
//       hourlyRate: "599/hr",
//       rating: 4.6,
//     },
//     {
//       id: 4,
//       name: "Lucy Green",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Sofa Cleaning",
//       location: "Houston, TX",
//       hourlyRate: "399/hr",
//       rating: 4.7,
//     },
//     {
//       id: 5,
//       name: "Mike Johnson",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Intense Cleaning",
//       location: "Phoenix, AZ",
//       hourlyRate: "299/hr",
//       rating: 4.4,
//     },
//     {
//       id: 6,
//       name: "Sophia Lee",
//       profileImage: "https://via.placeholder.com/100",
//       category: "  Men Haircutting",
//       location: "Philadelphia, PA",
//       hourlyRate: "999/hr",
//       rating: 4.9,
//     },
//     {
//       id: 7,
//       name: "Chris Wilson",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Sofa Cleaning",
//       location: "San Antonio, TX",
//       hourlyRate: "899/hr",
//       rating: 4.6,
//     },
//     {
//       id: 8,
//       name: "Emily Davis",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Intense Cleaning",
//       location: "San Diego, CA",
//       hourlyRate: "299/hr",
//       rating: 4.8,
//     },
//     {
//       id: 9,
//       name: "Daniel Moore",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Door Lock Repairing",
//       location: "Dallas, TX",
//       hourlyRate: "399/hr",
//       rating: 4.3,
//     },
//     {
//       id: 10,
//       name: "Olivia Martinez",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Geyser Service",
//       location: "San Jose, CA",
//       hourlyRate: "199/hr",
//       rating: 5.0,
//     },
//     {
//       id: 11,
//       name: "Daniel Moore",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Bathroom Cleaning",
//       location: "Dallas, TX",
//       hourlyRate: "399/hr",
//       rating: 4.3,
//     },
//     {
//       id: 12,
//       name: "Olivia Martinez",
//       profileImage: "https://via.placeholder.com/100",
//       category: "Sofa Cleaning",
//       location: "San Jose, CA",
//       hourlyRate: "199/hr",
//       rating: 5.0,
//     },
//   ];

//   // const filteredTaskers = taskers.filter((tasker) =>
//   //   service
//   //     ? tasker.category.toLowerCase().includes(service.toLowerCase())
//   //     : true // Show all taskers if no service provided
//   // );

//   const filteredTaskers = taskers.filter((tasker) =>
//     tasker.category
//       .toLowerCase()
//       .replace(/\s+/g, "")
//       .includes(service.toLowerCase().replace(/\s+/g, ""))
//   );

//   return (
//     <div>
//       <Navbar />
//       <div className="container my-5">
//         <h2 className="text-center mb-4">Tasker List</h2>
//         <div className="row">
//           {service && filteredTaskers.length === 0 ? (
//             <div className="col-12">
//               <p>No taskers available for this service.</p>
//             </div>
//           ) : (
//             filteredTaskers.map((tasker) => (
//               <div className="col-md-6 col-lg-4 mb-4" key={tasker.id}>
//                 <div className="card h-100">
//                   <div className="card-body d-flex align-items-center">
//                     <div className="me-3">
//                       <img
//                         src={tasker.profileImage}
//                         alt={`${tasker.name} Profile`}
//                         className="rounded-circle"
//                         width="60"
//                         height="60"
//                       />
//                     </div>
//                     <div>
//                       <h5 className="card-title mb-1">{tasker.name}</h5>
//                       <p className="text-muted mb-1">{tasker.category}</p>
//                       <p className="mb-1">
//                         <strong>Location:</strong> {tasker.location}
//                       </p>
//                       <p className="mb-1">
//                         <strong>Rate:</strong> {tasker.hourlyRate}
//                       </p>
//                       <p className="mb-2">
//                         <strong>Rating:</strong> ⭐ {tasker.rating}
//                       </p>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => navigate(`/taskerProfile/${tasker.id}`)}
//                       >
//                         View Profile
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskerList;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const TaskerList = () => {
  const navigate = useNavigate();
  const { service } = useParams(); // Get service from URL
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTaskers, setFilteredTaskers] = useState([]);
  const [placeholderText, setPlaceholderText] = useState("Search Task"); // Default placeholder text

  const taskers = [
    {
      id: 1,
      name: "John Doe",
      category: "Door Lock Repairing",
      location: "New York, NY",
      hourlyRate: "150/hr",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Jane Smith",
      category: "Geyser Service",
      location: "Los Angeles, CA",
      hourlyRate: "200/hr",
      rating: 4.5,
    },
    {
      id: 3,
      name: "Tom Brown",
      category: "Bathroom Cleaning",
      location: "Chicago, IL",
      hourlyRate: "599/hr",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Lucy Green",
      category: "Sofa Cleaning",
      location: "Houston, TX",
      hourlyRate: "399/hr",
      rating: 4.7,
    },
    {
      id: 5,
      name: "Mike Johnson",
      category: "Intense Cleaning",
      location: "Phoenix, AZ",
      hourlyRate: "299/hr",
      rating: 4.4,
    },
    {
      id: 6,
      name: "Sophia Lee",
      category: "Men Haircutting",
      location: "Philadelphia, PA",
      hourlyRate: "999/hr",
      rating: 4.9,
    },
    {
      id: 7,
      name: "Chris Wilson",
      category: "Sofa Cleaning",
      location: "San Antonio, TX",
      hourlyRate: "899/hr",
      rating: 4.6,
    },
    {
      id: 8,
      name: "Emily Davis",
      category: "Intense Cleaning",
      location: "San Diego, CA",
      hourlyRate: "299/hr",
      rating: 4.8,
    },
    {
      id: 9,
      name: "Daniel Moore",
      category: "Door Lock Repairing",
      location: "Dallas, TX",
      hourlyRate: "399/hr",
      rating: 4.3,
    },
    {
      id: 10,
      name: "Olivia Martinez",
      category: "Geyser Service",
      location: "San Jose, CA",
      hourlyRate: "199/hr",
      rating: 5.0,
    },
    {
      id: 11,
      name: "Daniel Moore",
      category: "Bathroom Cleaning",
      location: "Dallas, TX",
      hourlyRate: "399/hr",
      rating: 4.3,
    },
    {
      id: 12,
      name: "Olivia Martinez",
      category: "Sofa Cleaning",
      location: "San Jose, CA",
      hourlyRate: "199/hr",
      rating: 5.0,
    },
  ];

  useEffect(() => {
    const filtered = taskers.filter((tasker) =>
      tasker.category.toLowerCase().includes(service.toLowerCase())
    );
    setFilteredTaskers(filtered);

    // Change placeholder text when a specific task is selected
    if (service) {
      setPlaceholderText("Search Tasker");
    } else {
      setPlaceholderText("Search Task");
    }
  }, [service]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const filtered = taskers.filter(
      (tasker) =>
        tasker.category.toLowerCase().includes(service.toLowerCase()) &&
        tasker.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTaskers(filtered);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} placeholderText={placeholderText} />
      <div className="container my-5">
        <h2 className="text-center mb-4">Tasker List for {service}</h2>
        <div className="row">
          {filteredTaskers.length === 0 ? (
            <div className="col-12">
              <p>No taskers available for this service.</p>
            </div>
          ) : (
            filteredTaskers.map((tasker) => (
              <div className="col-md-6 col-lg-4 mb-4" key={tasker.id}>
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
                      <p className="text-muted mb-1">{tasker.category}</p>
                      <p className="mb-1">
                        <strong>Location:</strong> {tasker.location}
                      </p>
                      <p className="mb-1">
                        <strong>Rate:</strong> {tasker.hourlyRate}
                      </p>
                      <p className="mb-2">
                        <strong>Rating:</strong> ⭐ {tasker.rating}
                      </p>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => navigate(`/taskerProfile/${tasker.id}`)}
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
      </div>
    </div>
  );
};

export default TaskerList;
