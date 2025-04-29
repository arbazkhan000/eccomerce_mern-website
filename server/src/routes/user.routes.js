import express from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware,isAdmin } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);
userRoutes.get(
    "/profile",
    authMiddleware,
    // isAdmin,
    UserController.getUserProfile
);

export default userRoutes;
