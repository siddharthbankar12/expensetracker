import React, { useState } from "react";
import "../styles/CreateExpense.css";
import axiosInstance from "../axiosInstance.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateExpense = () => {
  const userData = useSelector((state) => state.user.user);

  const route = useNavigate();
  const [user, setUser] = useState({
    expenseName: "Lunch",
    amount: "12344",
    date: "",
    description: "a",
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
      const response = await axiosInstance.post("/expense/create", {
        expenseName: user.expenseName,
        amount: user.amount,
        date: user.date,
        description: user.description,
        userId: userData?.userId,
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        route("/expense-list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Create new expense</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="expenseName">Expense Name:</label>
        <br />
        <input
          type="text"
          id="expenseName"
          value={user.expenseName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="amount">Amount:</label>
        <br />
        <input
          type="text"
          id="amount"
          value={user.amount}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="date">Date:</label>
        <br />
        <input
          type="date"
          id="date"
          value={user.date}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="description">Description:</label>
        <br />
        <input
          type="text"
          id="description"
          value={user.description}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" className="registerRe">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default CreateExpense;
