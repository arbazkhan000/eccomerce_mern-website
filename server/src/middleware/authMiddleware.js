import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ success: false, error: "Please token provided !" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoed token", decoded);

        const user = await User.findById(decoded.id);
        console.log("User from token", user);
        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ success: false, error: "User not found !" });
        }

        req.user = user;

        next();
    } catch (error) {
        return res.status(500).json({
            message: "Error validating token",
            error: error.message,
            success: false,
        });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};

export { authMiddleware, isAdmin };
