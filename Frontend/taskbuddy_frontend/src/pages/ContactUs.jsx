import React from "react";

import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";


// const contactUs=()=>{
//   // const navigate = useNavigate();

// return(
// <div>
//   <Navbar />
//   <br />
// <form>
//   <div class="mb-3">
//     <label for="exampleInputEmail1" class="form-label">Email address</label>
//     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//     <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
//   </div>
//   <div class="mb-3">
//     <label for="exampleInputPassword1" class="form-label">Password</label>
//     <input type="password" class="form-control" id="exampleInputPassword1" />
//   </div>
//   <div class="mb-3 form-check">
//     <input type="checkbox" class="form-check-input" id="exampleCheck1" />
//     <label class="form-check-label" for="exampleCheck1">Check me out</label>
//   </div>
//   <button type="submit" class="btn btn-primary">Submit</button>
// </form>


// </div>
// );
// };

// export default contactUs;

// import React from "react";

const ContactUs = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    navigate("/Home"); // Navigate back to Home
  };

  
  return (
    <div>
      <Navbar />
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f8f9fa" }}>
      <div style={{ width: "400px", padding: "20px", background: "#fff", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>

        

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Enter your name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" placeholder="Write your message" required></textarea>
          </div>
          <div style={{ textAlign: "center" }}>
            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Submit</button>
          </div>
        </form>
      </div>
    </div>

    </div>
  );
};

export default ContactUs;
