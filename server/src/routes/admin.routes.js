import express from "express";
import AdminController from "../controllers/admin.controller.js";

const adminRoutes = express.Router();

adminRoutes.route("/admin/create").post(AdminController.adminRegister);
adminRoutes.route("/admin/login").post(AdminController.adminRegister);

export default adminRoutes;
