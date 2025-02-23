import React, { useState } from "react";
import { Mail, Lock, User, Rocket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../compcss/login.css"; // Reusing login styles
import land from "../assets/land.png";
const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "top-right",
    });

  const handleError = (err) =>
    toast.error(err, {
      position: "top-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/signup",
        inputValue
      );
      const { success, message } = data;
      if (success) {
        localStorage.setItem("token", data.token);
        handleSuccess(message);
        setTimeout(() => navigate("/usersign"), 1000);
      }
    } catch (error) {
      console.log(error);
      handleError("Signup failed. Please try again.");
    }
    setInputValue({ email: "", password: "", username: "" });
  };

  return (
    <div className="container min-w-full">
      {" "}
      {/* Same wrapper class as login page */}
      <div className="card">
        {" "}
        {/* Reusing the login card design */}
        <div className="header">
          <div className="icon-container">
            <Rocket className="icon" />
          </div>
          <h1>Join SignDesk</h1>
          <p>Create an account to get started</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <div className="input-container">
              <User className="input-icon" />
              <input
                id="username"
                name="username"
                type="text"
                required
                placeholder="Enter your username"
                value={username}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>

          <p className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <div className="rounded-lg overflow-hidden transition-transform duration-300 w-[600px] h-[500px]">
        <img
          src={land}
          alt="Background"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
