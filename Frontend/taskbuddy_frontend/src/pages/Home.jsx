// import React, { useState } from "react";
// import Navbar from "./Navbar";
// import sofaclean from "../Images/sofaclean.jpeg";
// import bathclean from "../Images/bathclean.webp";
// import geyser from "../Images/geyserService.webp";
// import haircut from "../Images/1731066070722-1f3637.webp";
// import instence from "../Images/intenseclean.webp";
// import doorlock from "../Images/doorlock.webp";
// import { FaStar } from "react-icons/fa";
// import { FaStarHalf } from "react-icons/fa";
// import { FaRupeeSign } from "react-icons/fa";
// import Footer from "./Footer";
// import { CgProfile } from "react-icons/cg";
// import TaskerProfile from "./TaskerProfile";
// import TaskerList from "./TaskerList";
// import TaskerRegistration from "./TaskerRegistration";
// import CustomerRegistration from "./CustomerRegistration";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const Home = () => {
//   const services = [
//     { id: "sofa", name: "Sofa Cleaning", price: 599, img: sofaclean },
//     { id: "bathroom", name: "Bathroom Cleaning", price: 500, img: bathclean },
//     { id: "geyser", name: "Geyser Service", price: 300, img: geyser },
//     { id: "haircut", name: "Men Haircut", price: 249, img: haircut },
//     { id: "cleaning", name: "Intense Cleaning", price: 699, img: instence },
//     { id: "doorlock", name: "Door Lock Repair", price: 199, img: doorlock },
//   ];
//   const navigate = useNavigate(); // Initialize navigate hook
//   const [selectedService, setSelectedService] = useState(null);
//   const [filteredServices, setFilteredServices] = useState(services);

//   const handleSearch = (searchTerm) => {
//     if (searchTerm.trim() === "") {
//       setFilteredServices(services);
//     } else {
//       const filtered = services.filter((service) =>
//         service.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredServices(filtered);
//     }
//   };

//   const handleServiceClick = (service) => {
//     setSelectedService(service);
//     navigate(`/taskers/${service}`); // Navigate to the TaskerList page with the service
//   };

//   return (
//     <div className="mt-3">
//       <div className="border-bottom">
//         <Navbar onSearch={handleSearch} />
//       </div>
//       <div className="d-flex justify-content-between mt-5">
//         <h2 className="mx-auto">Home Services At Your DoorStep</h2>
//       </div>
//       <div>
//         <div className="container text-center mt-5 mb-5">
//           <div className="row">
//             <div className="col" onClick={() => handleServiceClick("sofa")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img
//                   src={sofaclean}
//                   className="card-img-top"
//                   alt="Sofa Cleaning"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">Sofa Cleaning</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 599.00
//                 </div>
//               </div>
//             </div>
//             <div className="col" onClick={() => handleServiceClick("bathroom")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img
//                   src={bathclean}
//                   className="card-img-top"
//                   alt="Bathroom Cleaning"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">Bathroom Cleaning</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStarHalf />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 500.00
//                 </div>
//               </div>
//             </div>
//             <div className="col" onClick={() => handleServiceClick("geyser")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img
//                   src={geyser}
//                   className="card-img-top"
//                   alt="Geyser Service"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">Geyser Service</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 300.00
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="container text-center mt-5 mb-5">
//           <div className="row">
//             <div className="col" onClick={() => handleServiceClick("haircut")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img src={haircut} className="card-img-top" alt="Men Haircut" />
//                 <div className="card-body">
//                   <p className="card-text">Men Haircut</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                   <FaStarHalf />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 249.00
//                 </div>
//               </div>
//             </div>
//             <div className="col" onClick={() => handleServiceClick("cleaning")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img
//                   src={instence}
//                   className="card-img-top"
//                   alt="Intense Cleaning"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">Intense Cleaning</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 699.00
//                 </div>
//               </div>
//             </div>
//             <div className="col" onClick={() => handleServiceClick("doorlock")}>
//               <div className="card" style={{ width: "18rem" }}>
//                 <img
//                   src={doorlock}
//                   className="card-img-top"
//                   alt="Door Lock Repair"
//                 />
//                 <div className="card-body">
//                   <p className="card-text">Door Lock Repair</p>
//                   <FaStar />
//                   <FaStar />
//                   <FaStar />
//                 </div>
//                 <div>
//                   <FaRupeeSign /> 199.00
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between mt-5 mx-0">
//         <Footer />
//       </div>
//     </div>
//   );
// };

// export default Home;

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

const Home = () => {
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

export default Home;
