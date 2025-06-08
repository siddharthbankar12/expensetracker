import React, { useState } from "react";
import "../styles/Register.css";
import axiosInstance from "../axiosInstance.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const route = useNavigate();
  const [user, setUser] = useState({
    userName: "user1",
    fullName: "user one",
    email: "user1@me.com",
    password: "a",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/register", {
        userName: user.userName,
        email: user.email,
        fullName: user.fullName,
        password: user.password,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        route("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Username:</label>
        <br />
        <input
          type="text"
          id="userName"
          value={user.userName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="fullName">Full Name:</label>
        <br />
        <input
          type="text"
          id="fullName"
          value={user.fullName}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="registerRe">
          Register
        </button>
      </form>
      <p
        className="loginLink"
        onClick={() => {
          route("/login");
        }}
      >
        Already have an account? Login here
      </p>
    </div>
  );
};

export default Register;
