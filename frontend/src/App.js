import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import ExpenseLis from "./pages/ExpenseLis";
import CreateExpense from "./components/CreateExpense";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";
import { login } from "./store/userSlice";

const App = () => {
  const userData = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  async function getCurrentUserData(token) {
    try {
      const response = await axiosInstance.post("auth/get-current-user", {
        token,
      });

      if (response.data.success) {
        dispatch(login(response.data.userData));
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!userData) {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log("user logged in but lost data");
        getCurrentUserData(JSON.parse(token));
      } else {
        // console.log("user not logged in");
      }
    }
  }, [userData]);

  return (
    <div>
      <Routes>
        <Route path="/landing-page" element={<HomePage />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense-list" element={<ExpenseLis />} />
        <Route path="/expense-create" element={<CreateExpense />} />
      </Routes>
    </div>
  );
};

export default App;
