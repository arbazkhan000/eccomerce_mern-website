import express from "express";
import AdminController from "../controllers/admin.controller.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { upload } from "../utils/multer.js";

const adminRoutes = express.Router();

// POST /api/admin/products
adminRoutes.post(
    "/products",
    upload.array("images", 4),
    authMiddleware,
    isAdmin,
    AdminController.createProduct
);

// PUT /api/admin/products/:id
adminRoutes.put(
    "/products/:id",
    authMiddleware,
    isAdmin,
    AdminController.updateProduct
);

 // DELETE /api/admin/products/:id
adminRoutes.delete(
    "/products/:id",
    upload.array("image", 4),
    authMiddleware,
    isAdmin,
    AdminController.deleteProduct
);

// GET /api/admin/products
adminRoutes.get(
    "/products",
    authMiddleware,
    isAdmin,
    AdminController.getAllProducts
);
export default adminRoutes;
