import React from "react";
import "../styles/HomePage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";

const HomePage = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const router = useNavigate();

  console.log(userData);
  return (
    <div className="HPContainer">
      <button
        className="btnLogOut"
        onClick={() => {
          dispatch(logout());
          router("/login");
        }}
      >
        LogOut
      </button>
      <h3>Welcome to expense tracker</h3>
      <div className="HPBtn">
        <p
          onClick={() => {
            router("/expense-create");
          }}
        >
          Add Expense
        </p>
        <p
          onClick={() => {
            router("/expense-list");
          }}
        >
          Expense List
        </p>
      </div>
      <p>
        Track and manage your expenses effectively. Use the navigation link to
        add new expenses or view your expenses history
      </p>
    </div>
  );
};

export default HomePage;
