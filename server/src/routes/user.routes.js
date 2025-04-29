import express from "express";
import UserController from "../controllers/user.controller.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);

export default userRoutes;
