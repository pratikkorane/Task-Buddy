import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-light py-4">
      <div className="mx-3">
        <div className="row">
          {/* TaskBuddy Info */}
          <div className="col-md-3 mb-3">
            <h4>TaskBuddy</h4>
            <p>
              Your trusted partner for home services and skilled tasks. From
              cleaning to moving, we’ve got you covered.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="" onClick={() => navigate("/taskerPanel")}>
                  Tasker Panel
                </a>
              </li>
              <li>
                <a href="/services" className="text-light text-decoration-none">
                  Our Services
                </a>
              </li>{" "}
              <li>
                <a
                  href=""
                  // onClick={(navigate = "/adminPanel")}
                  onClick={() => navigate("/adminPanel")}
                  className="text-light text-decoration-none"
                >
                  Admin Panel
                </a>
              </li>
              <li>
                <a href="/contact" className="text-light text-decoration-none">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-3">
            <h5>Our Services</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="/services/door"
                  className="text-light text-decoration-none"
                >
                  Door Lock Repairing
                </a>
              </li>
              <li>
                <a
                  href="/services/geyser"
                  className="text-light text-decoration-none"
                >
                  Geyser Service
                </a>
              </li>
              <li>
                <a
                  href="/services/bathroom"
                  className="text-light text-decoration-none"
                >
                  Bathroom Cleaning
                </a>
              </li>
              <li>
                <a
                  href="/services/haircut"
                  className="text-light text-decoration-none"
                >
                  Men Haircutting
                </a>
              </li>

              <li>
                <a
                  href="/services/cleaning"
                  className="text-light text-decoration-none"
                >
                  Intense Cleaning
                </a>
              </li>

              <li>
                <a
                  href="/services/sofa"
                  className="text-light text-decoration-none"
                >
                  Sofa Cleaning
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-3">
            <h5>Contact Us</h5>
            <p>Got a question? Need help? Get in touch with us:</p>
            <ul className="list-unstyled">
              <li>Phone: +91 960 737 0608</li>
              <li>Email: support@taskbuddy.com</li>
              <li>Address: 123 Shnaivar Peth, Karad City, 411040</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} TaskBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
