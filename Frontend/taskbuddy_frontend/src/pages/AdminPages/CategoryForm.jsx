import React, { useState } from "react";
import Navbar from "../Navbar";

const CategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  //   const [categoryType, setCategoryType] = useState("general");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send to API
    console.log({
      categoryName,
      description,
      //   categoryType,
    });
    // Reset form after submission
    setCategoryName("");
    setDescription("");
    // setCategoryType("general");
  };

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="container w-50">
        <h2 className="text-center mt-5 mb-4">Add New Category</h2>

        <form onSubmit={handleSubmit}>
          {/* Category Name */}
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-control"
              rows="3"
              placeholder="Enter category description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Category Type */}
          {/* <div className="mb-3">
          <label htmlFor="categoryType" className="form-label">
            Category Type
          </label>
          <select
            id="categoryType"
            className="form-select"
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
          >
            <option value="general">General</option>
            <option value="special">Special</option>
            <option value="premium">Premium</option>
          </select>
        </div> */}

          {/* Submit Button */}
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary ">
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
