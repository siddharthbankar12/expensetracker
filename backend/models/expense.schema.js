import mongoose, { model, Schema } from "mongoose";

const expenseSchema = new Schema({
  expenseName: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const Expense = model("expenses", expenseSchema);

export default Expense;
