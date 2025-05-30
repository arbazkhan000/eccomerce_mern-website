import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { StatusCodes } from "http-status-codes";
import ConnectDb from "./src/db/Connect.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Base route
app.get("/", (req, res) => {
    res.send("Welcome to Ecommerce Store API");
});

// Universal routes



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});



import userRoutes from "./src/routes/user.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";

app.use("/api/users", userRoutes);  
app.use("/api/admin", adminRoutes); 


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
