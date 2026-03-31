import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
const usersRoutes = Router();

usersRoutes.post("/auth/register", registerUser);
usersRoutes.post("/auth/login", loginUser);

export default usersRoutes;
