import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { StatusCodes } from "http-status-codes";
import ConnectDb from "./src/db/Connect.js";
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Store API");
});

// Universal routes
app.use("/api/auth", userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

// Start the server
const ServerStart = async () => {
    try {
        await ConnectDb();
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

ServerStart();
