import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5286/api/Tasker/Login", { email, password });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                setSuccess("Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/taskerPanel";
                }, 2000);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Tasker Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary w-100">Login</button>

                </form>
                <br></br>
                <a href="/tasker/Registration" className="my-link">Register New User</a>
            </div>

            
        </div>
    );
};

export default Login; // Ensure this is a default export