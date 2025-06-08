import { Router } from "express";
import {
  CreateExpense,
  ListExpense,
  UpdateExpense,
} from "../controllers/expense.controllers.js";

const ExpenseRouters = Router();

ExpenseRouters.post("/create", CreateExpense);
ExpenseRouters.post("/list", ListExpense);
ExpenseRouters.put("/update", UpdateExpense);

export default ExpenseRouters;
