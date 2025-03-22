import React from "react";
import Navbar from "./Navbar";

const TaskerProfile = () => {
  // Example tasker data
  const tasker = {
    name: "John Doe",
    profileImage: "https://stock.adobe.com/search?k=electrician",
    category: "Electrician",
    experience: "5 years",
    rating: 4.8,
    reviews: 120,
    location: "New York, NY",
    hourlyRate: "$20/hr",
    description:
      "Experienced electrician specializing in residential and commercial electrical repairs and installations.",
    skills: ["Wiring", "Lighting", "Troubleshooting", "Repair"],
    contact: {
      phone: "123-456-7890",
      email: "johndoe@example.com",
    },
  };

  const hireTasker = () => {
    alert(`You have hired ${tasker.name}!`);
  };

  return (
    <div className="bg-body-secondary">
      <Navbar />
      <div className="container my-5">
        <div className="card">
          <div className="row g-0">
            {/* Tasker Image */}
            <div className="col-md-4">
              <img
                src={tasker.profileImage}
                alt={`${tasker.name} Profile`}
                className="img-fluid rounded-start"
              />
            </div>

            {/* Tasker Details */}
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{tasker.name}</h3>
                <p className="text-muted">{tasker.category}</p>
                <p>
                  <strong>Experience:</strong> {tasker.experience}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {tasker.rating} ({tasker.reviews}{" "}
                  reviews)
                </p>
                <p>
                  <strong>Location:</strong> {tasker.location}
                </p>
                <p>
                  <strong>Hourly Rate:</strong> {tasker.hourlyRate}
                </p>
                <p>
                  <strong>Description:</strong> {tasker.description}
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {tasker.skills.map((skill, index) => (
                    <span key={index} className="badge bg-primary me-2">
                      {skill}
                    </span>
                  ))}
                </p>
                <p>
                  <strong>Contact:</strong>{" "}
                  <span className="d-block">📞 {tasker.contact.phone}</span>
                  <span className="d-block">📧 {tasker.contact.email}</span>
                </p>

                {/* Hire Button */}
                <button className="btn btn-success mt-3" onClick={hireTasker}>
                  Hire {tasker.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskerProfile;
