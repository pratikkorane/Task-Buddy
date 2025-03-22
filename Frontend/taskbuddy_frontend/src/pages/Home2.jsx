
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import sofaclean from "../Images/sofaclean.jpeg";
import bathclean from "../Images/bathclean.webp";
import geyser from "../Images/geyserService.webp";
import haircut from "../Images/1731066070722-1f3637.webp";
import instence from "../Images/intenseclean.webp";
import doorlock from "../Images/doorlock.webp";
import { FaStar, FaStarHalf, FaRupeeSign } from "react-icons/fa";

const Home2 = () => {
  const navigate = useNavigate();

  const services = [
    { id: "sofa", name: "Sofa Cleaning", price: 599, img: sofaclean },
    { id: "bathroom", name: "Bathroom Cleaning", price: 500, img: bathclean },
    { id: "geyser", name: "Geyser Service", price: 300, img: geyser },
    { id: "haircut", name: "Men Haircut", price: 249, img: haircut },
    { id: "cleaning", name: "Intense Cleaning", price: 699, img: instence },
    { id: "doorlock", name: "Door Lock Repair", price: 199, img: doorlock },
  ];

  const [filteredServices, setFilteredServices] = useState(services);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/taskers/${serviceId}`); // Navigate to tasker details with the service ID
  };

  return (
    <div className="mt-3">
      <div className="border-bottom">
        <Navbar onSearch={handleSearch} />
      </div>
      <div className="d-flex justify-content-between mt-5">
        <h2 className="mx-auto">Home Services At Your Doorstep</h2>
      </div>
      <div className="container text-center mt-5 mb-5">
        <div className="row">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="col"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={service.img}
                  className="card-img-top"
                  alt={service.name}
                />
                <div className="card-body">
                  <p className="card-text">{service.name}</p>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  {service.id === "bathroom" || service.id === "haircut" ? (
                    <FaStarHalf />
                  ) : (
                    <FaStar />
                  )}
                </div>
                <div>
                  <FaRupeeSign /> {service.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
          {filteredServices.length === 0 && (
            <p>No services found. Try a different search term!</p>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-between mt-5 mx-0">
        <Footer />
      </div>
    </div>
  );
};

export default Home2;
