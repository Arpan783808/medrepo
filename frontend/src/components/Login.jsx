import React, { useState } from "react";
import { Mail, Lock, Rocket } from "lucide-react";
import "../compcss/login.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import land from "../assets/land.png";
const App = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
      const { data } = await axios.post("http://localhost:3001/login", {
        ...formData,
      });
      const { success, message } = data;
      if (success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("useremail", data.userid);

        setTimeout(() => {
          navigate("/usersign");
        });
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError("Login failed. Please try again.");
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="relative min-h-screen flex gap-10 items-center justify-center">
      {/* Background Image */}
      <div className="rounded-lg overflow-hidden transition-transform duration-300 w-[600px] h-[500px]">
        <img
          src={land}
          alt="Background"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Card Container */}
      <div className="bg-white p-10 h-[550px] w-[450px] rounded-xl shadow-lg transition-transform duration-300">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Rocket className="text-gray-600 w-12 h-12" />
          </div>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-gray-500">Enter your details to sign in</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="flex items-center border rounded-lg p-3 mt-1">
              <Mail className="text-gray-500 mr-3" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="flex items-center border rounded-lg p-3 mt-1">
              <Lock className="text-gray-500 mr-3" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign in
          </button>

          <p className="text-center text-gray-500 text-sm">
            Don't have an account? {" "}
            <Link to={"/signup"} className="text-blue-600">
              Signup
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;