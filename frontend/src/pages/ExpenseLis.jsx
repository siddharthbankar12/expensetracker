import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "../styles/ExpenseList.css";

const ExpenseList = () => {
  const userData = useSelector((state) => state.user.user);
  const [list, setList] = useState([]);
  const [editExpense, setEditExpense] = useState(null); // Selected expense for editing
  const [form, setForm] = useState({
    expenseName: "",
    amount: "",
    date: "",
    description: "",
  });

  const handleListExpense = async () => {
    try {
      const response = await axiosInstance.post(`/expense/list`, {
        userId: userData?.userId,
      });

      if (response.data.success) {
        setList(response.data.userExpenses);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch expenses");
    }
  };

  useEffect(() => {
    if (userData) {
      handleListExpense();
    }
  }, [userData]);

  const handleEditClick = (expense) => {
    setEditExpense(expense._id);
    setForm({
      expenseName: expense.expenseName,
      amount: expense.amount,
      date: dayjs(expense.date).format("YYYY-MM-DD"),
      description: expense.description,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axiosInstance.put(`/expense/update`, {
        id: editExpense,
        ...form,
      });

      if (response.data.success) {
        toast.success("expense updated");
        setEditExpense(null);
        handleListExpense();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("failed to update expense");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="ELContainer">
      <h2 className="ELHead">Expenses List</h2>
      {list.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        list.map((expense, idx) => (
          <div key={idx} className="ELSingle">
            {editExpense === expense._id ? (
              <>
                <input
                  name="expenseName"
                  value={form.expenseName}
                  onChange={handleChange}
                  placeholder="Expense Name"
                />
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                />
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditExpense(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{expense.expenseName}</h3>
                <p>Amount: ₹{expense.amount}</p>
                <p>Date: {dayjs(expense.date).format("DD-MM-YYYY")}</p>
                <p>Description: {expense.description}</p>
                <button onClick={() => handleEditClick(expense)}>Update</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ExpenseList;
