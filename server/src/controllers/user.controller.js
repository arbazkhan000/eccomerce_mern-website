import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";

// Generate JWT Token
export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};

class UserController {
    // @desc    Register a new user
    static async registerUser(req, res) {
        try {
            const { fullName, email, password } = req.body;

            // Check if user already exists
            const existingUser = await User.findOne({ email }); // Use findOne instead of find
            if (existingUser) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "User already exists",
                });
            }

            // Create new user
            const newUser = await User.create({
                fullName,
                email,
                password,
            });

            // Send response success

            res.status(StatusCodes.CREATED).json({
                success: true,
                message: "User registered successfully",
                data: newUser,
                token: generateToken({ id: newUser._id }), // Use _id for the token payload
            });
        } catch (error) {
            console.error("Error in registerUser:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    // @desc    Login user
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ success: false, message: "Invalid credentials" });
            }
            // Check if password is correct
            const isPasswordCorrect = await user.comparePassword(password); // Ensure comparePassword is defined in your schema
            if (!isPasswordCorrect) {
                return res
                    .status(StatusCodes.UNAUTHORIZED)
                    .json({ success: false, message: "Invalid credentials" });
            }

            // Send response success
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User logged in successfully",
                data: user,
                token: generateToken({ id: user._id }), // Use _id for the token payload
            });
        } catch (error) {
            console.error("Error in loginUser:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    // @desc    Get user profile
    static async getUserProfile(req, res) {
        try {

            const user = req.user ;
            if (!user) {
                return res
                    .status(StatusCodes.NOT_FOUND)
                    .json({ success: false, message: "User not found" });
            }

            // Send response success
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "User profile retrieved successfully",
                data: user,
            });
        } catch (error) {
            console.error("Error in getUser:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
}

export default UserController;
