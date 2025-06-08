import { Router } from "express";
import ExpenseRouters from "./expense.routers.js";
import AuthRouters from "./auth.routers.js";

const AllRouters = Router();

AllRouters.use("/expense", ExpenseRouters);
AllRouters.use("/auth", AuthRouters);

export default AllRouters;
