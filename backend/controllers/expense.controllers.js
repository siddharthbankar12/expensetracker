import { json } from "express";
import Expense from "../models/expense.schema.js";
import User from "../models/user.schema.js";

export const CreateExpense = async (req, res) => {
  try {
    const { expenseName, amount, date, description, userId } = req.body;

    console.log(expenseName, amount, date, description, userId);

    if (!expenseName || !amount || !date || !description || !userId) {
      return res.json({ success: false, message: "all fields are required" });
    }

    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.json({
        success: false,
        message: "user id required",
      });
    }

    const newExpense = new Expense({
      expenseName,
      amount,
      date,
      description,
      userId,
    });

    await newExpense.save();

    return res.json({ success: true, message: "expense created successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

export const ListExpense = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const findList = await Expense.find({ userId });

    return res.json({
      success: true,
      message: "List fetched successfully",
      userExpenses: findList,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

export const UpdateExpense = async (req, res) => {
  try {
    const { id, expenseName, amount, date, description } = req.body;

    if (!id) {
      return res.json({ success: false, message: "expense ID is required" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        expenseName,
        amount,
        date,
        description,
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.json({ success: false, message: "expense not found" });
    }

    return res.json({
      success: true,
      message: "expense updated successfully",
      updatedExpense,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};
