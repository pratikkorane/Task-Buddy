import React from "react";
// import Image from "../images/Abhay_image_pass.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const AboutUs = () => {
    const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
         <Navbar />
        {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">TaskBuddy</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link" href="Admin.jsx">Admin</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/about">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ContactUs">Contact Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Register">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav> */}


        <div>
            <h2>About Us</h2>
            <h4 style={{textAlign:"left"}}>Mission of our Project :</h4>
            <p style={{textAlign:"left"}}>
            Our mission is to create a seamless platform that connects customers with skilled professionals 
            for everyday tasks such as plumbing, product delivery, and more. We aim to simplify lives by providing 
            a reliable, efficient, and user-friendly system where customers can easily find and book trusted taskers.
            By fostering convenience and trust, we empower individuals to focus on what matters most while ensuring 
            taskers have opportunities to earn and grow. Through innovation and dedication, we strive to make task 
            management hassle-free and accessible to everyone.
            </p>
        </div>

        <div>
            <div className="row">
            <div className="col-3" style={{textAlign:"justify"}}>
                <div class="card" style={{width: "18rem"}}>
                    <img src="/Images1/Abhay_image_pass.jpg" class="card-img-top" alt="not applicable to view" />
                    <div class="card-body">
                        <h5 class="card-title">Mayur Gadakh</h5>
                        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially unchanged.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div className="col-3" style={{textAlign:"justify"}}>
                <div class="card" style={{width: "18rem"}}>
                    <img src="Images1/Abhay_image_pass.jpg" class="card-img-top" alt="not applicable to view" />
                    <div class="card-body">
                        <h5 class="card-title">Prathamesh Hendre</h5>
                        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially unchanged.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div className="col-3" style={{textAlign:"justify"}}>
                <div class="card" style={{width: "18rem"}}>
                    <img src="/Images1/Abhay_image_pass.jpg" class="card-img-top" alt="not applicable to view" />
                    <div class="card-body">
                        <h5 class="card-title">Abhishekh Pawar</h5>
                        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially unchanged.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            <div className="col-3" style={{textAlign:"justify"}}>
                <div class="card" style={{width: "18rem"}}>
                    <img src="/Images1/Abhay_image_pass.jpg" class="card-img-top" alt="not applicable to view" />
                    <div class="card-body">
                        <h5 class="card-title">Abhay Siddheshware</h5>
                        <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                            into electronic typesetting, remaining essentially unchanged.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>

            

            <h4 style={{marginTop:"30px"}}>©Copyright TaskBuddy 2024</h4>


                {/* <div className="col-3" style={{textAlign:"justify"}}>
                    <img src="/images/Abhay_image_pass.jpg" alt="not applicable to view" height={100} width={100} style={{marginLeft:"50px"}} />
                    <h6>Mayur Gadakh</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                        into electronic typesetting, remaining essentially unchanged. </p>
                
                </div> */}
                {/* <div className="col-3" style={{textAlign:"justify"}}>
                    <img src="/images/Abhay_image_pass.jpg" alt="not applicable to view" height={100} width={100}  />
                    <h6>Prathamesh Hendre</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                        into electronic typesetting, remaining essentially unchanged. </p>
                </div>
    
                <div className="col-3" style={{textAlign:"justify"}}>
                    <img src="/images/Abhay_image_pass.jpg" alt="not applicable to view" height={100} width={100} />
                    <h6>Abhishekh Pawar</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                        into electronic typesetting, remaining essentially unchanged.</p>
                </div> */}

                {/* <div className="col-3" style={{textAlign:"justify"}}>
                    <img src="/images/Abhay_image_pass.jpg" alt="not applicable to view" height={100} width={100} style={{marginLeft:"50px"}} />
                    <h6>Abhay Siddheshware</h6>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 
                        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and 
                        scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap 
                        into electronic typesetting, remaining essentially unchanged. </p>
                </div> */}
            </div>
        </div>
    </div>
  );
};

export default AboutUs;
