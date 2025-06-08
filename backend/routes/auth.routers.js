import { Router } from "express";
import {
  Register,
  Login,
  GetCurrentUser,
} from "../controllers/auth.controllers.js";

const AuthRouters = Router();

AuthRouters.post("/register", Register);
AuthRouters.post("/login", Login);
AuthRouters.post("/get-current-user", GetCurrentUser);

export default AuthRouters;
