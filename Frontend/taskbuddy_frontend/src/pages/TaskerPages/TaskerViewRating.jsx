import React, { useState, useEffect } from "react";
import axios from "axios";
// import jwtDecode from "jwt-decode"; // Correct import
import { jwtDecode } from 'jwt-decode'; // Correct import
import { useNavigate } from "react-router-dom";

const TaskerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/tasker/login"); // Redirect if no token
        return;
      }

      // Decode the token to get taskerId
      const decoded = jwtDecode(token);
      const taskerId = decoded.TaskerId;

      // API call
      const response = await axios.get(
        `http://localhost:5286/api/Tasker/${taskerId}/reviews`,
        {
          params: { page: 1, pageSize: 10 }, // Optional: Pagination
        }
      );

      // Access reviews data from the response
      const { $values: reviewsArray } = response.data.reviews;

      // Format the reviews
      const formattedReviews = reviewsArray.map((review) => ({
        id: review.reviewId,
        customerName: review.customerName,
        shortReview:
          review.comments.length > 50
            ? `${review.comments.substring(0, 50)}...`
            : review.comments,
        fullReview: review.comments,
        rating: review.rating,
        date: new Date(review.createdAt).toLocaleDateString(), // Ensure createdAt exists in response
        expanded: false,
      }));

      setReviews(formattedReviews);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
      setLoading(false);
    }
  };

  const toggleReviewExpansion = (id) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, expanded: !review.expanded } : review
      )
    );
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Tasker Ratings and Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to rate!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="review-card mb-3 p-3 border rounded">
            <h5>{review.customerName}</h5>
            <p>{review.shortReview}</p>
            <div className="d-flex align-items-center">
              <span>Rating: </span>
              <div className="stars ml-2">
                {Array(review.rating)
                  .fill("★")
                  .map((star, index) => (
                    <span key={index} style={{ color: "gold" }}>
                      {star}
                    </span>
                  ))}
              </div>
            </div>
            <p className="text-muted">Reviewed on: {review.date}</p>

            {/* Expand Button */}
            <button
              className="btn btn-link"
              onClick={() => toggleReviewExpansion(review.id)}
            >
              {review.expanded ? "Collapse" : "Expand"}
            </button>

            {/* Full Review */}
            {review.expanded && <p className="mt-2">{review.fullReview}</p>}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskerReviews;
