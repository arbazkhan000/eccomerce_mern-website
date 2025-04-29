import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../model/user.schema.js";
import asyncHandler from "../utils/AsyncHandler.js";

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
};

class UserController {
    // @desc    Register a new user
    static registerUser = asyncHandler(async (req, res) => {
        const { fullName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.find({ email });
        if (existingUser) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, message: "User already exists" });
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
            token: generateToken({ id: newUser }),
        });
    });

    // @desc    Login user
    static loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ success: false, message: "Invalid credentials" });
        }
        // Check if password is corect
        const isPasswordCorrect = await user.comparePassword(password);
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
            token: generateToken({ id: user }),
        });
    });

    // @desc    Get user profile
    static getUser = asyncHandler(async (req, res) => {

        const userId = req.user.id; // Assuming you have middleware to set req.user

        // Find user by ID
        const user = await User.findById(userId).select("-password"); // Exclude password from response

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
    });
}

export default UserController;
