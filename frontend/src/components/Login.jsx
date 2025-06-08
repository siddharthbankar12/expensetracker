import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../store/userSlice";
import axiosInstance from "../axiosInstance";
import "../styles/Login.css";

const Login = () => {
  const route = useNavigate();
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  const [userData, setUserData] = useState({
    userName: "user1",
    password: "a",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseUser = await axiosInstance.post("/auth/login", {
        userName: userData.userName,
        password: userData.password,
      });

      console.log(responseUser);

      if (responseUser.data.success === true) {
        dispatch(login(responseUser.data.userData));
        toast.success(responseUser.data.message);
        setUserData({ userName: "", password: "" });
        route("/landing-page");
      } else {
        toast.error(responseUser.data.message);
      }
    } catch (error) {
      toast.error(
        error.responseUser.data.message || error.responseUser.data.error
      );
    }
  };

  useEffect(() => {
    if (token) {
      route("/landing-page");
    }
  }, [token]);

  return (
    <div className="LGContainer">
      <h1 className="">Login</h1>
      <form onSubmit={handleSubmit} className="formLG">
        <label htmlFor="userName">User Name :</label>
        <br />
        <input
          type="text"
          id="userName"
          name="userName"
          value={userData.userName}
          onChange={handleChange}
          placeholder="Enter your user Name"
          required
        />
        <br />
        <label htmlFor="password">Password :</label>
        <br />
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
        <br />
        <div className="btnContainerLG">
          <p type="submit" className="LGBtn" onClick={handleSubmit}>
            Login
          </p>

          <p
            className="LGBtn"
            onClick={() => {
              route("/");
            }}
          >
            Register
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
