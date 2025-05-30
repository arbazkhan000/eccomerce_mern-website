import express from "express";
import UserController from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

//public
userRoutes.post("/register", UserController.registerUser);
userRoutes.post("/login", UserController.loginUser);

// protected routes
userRoutes.get("/profile", authMiddleware, UserController.getUserProfile);

userRoutes.get("/products", authMiddleware, UserController.getAllProducts);

userRoutes.get(
    "/products/:id",
    authMiddleware,
    UserController.getProductDetails
);

userRoutes.get(
    "/unique-category-products",
    authMiddleware,
    UserController.getProductsByCategoryUnique
);
// userRoutes.get("/categories", authMiddleware, UserController.getAllCategories);

export default userRoutes;
