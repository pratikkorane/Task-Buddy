import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "johndoe@email.com",
    phone: "+1 234 567 890",
    profilePicture: "profile.jpg",
    address: "1234 Elm Street, Springfield, IL",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the profile data from backend here once ready
    // Example: fetchProfileData();

    // For now, data is hardcoded in the state above
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit updated profile data to backend here
    // Example: updateProfileData(profileData);

    // Navigate back to customer panel after saving
    navigate("/customer");
  };

  return (
    <div>
      <Navbar />
      <h1 className="mb-4 text-center mt-5">Edit Profile</h1>

      <div className="container">
        <div className="card">
          <div className="card-header bg-dark text-light">
            <h5>Edit Your Profile Information</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  value={profileData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="profilePicture" className="form-label">
                  Profile Picture
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => {
                    // Handle profile picture change
                    setProfileData({
                      ...profileData,
                      profilePicture: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
                {profileData.profilePicture && (
                  <div className="mt-2">
                    <img
                      src={profileData.profilePicture}
                      alt="Profile Preview"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="form-control"
                  rows="3"
                  value={profileData.address}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
