import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import Product from "../model/product.schema.js";
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
            const user = req.user;
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

    // @desc    Get all products (user)
    static async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "All products fetched successfully",
                data: products,
            });
        } catch (error) {
            console.error("Error in getAllProducts:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @desc    Get product details protected (user)
    static async getProductDetails(req, res) {
        try {
            const products = await Product.findById(req.params.id);
            if (!products) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Product not found",
                });
            }
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Product fetch successfully",
                data: products,
            });
        } catch (error) {
            console.error("Error in getAllProducts:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @ desc get products by category (user)
    static async getAllCategories(req, res) {
        try {
            // Fetch distinct categories from the Product collection
            const categories = await Product.distinct("category");

            if (categories.length === 0) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "No categories found",
                });
            }

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Categories fetched successfully",
                data: categories,
            });
        } catch (error) {
            console.error("Error in getAllCategories:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @desc    Get one product per unique category
    static async getProductsByCategoryUnique(req, res) {
        try {
            const uniqueCategoryProducts = await Product.aggregate([
                {
                    $sort: { createdAt: -1 }, // Optional: Sort by latest product
                },
                {
                    $group: {
                        _id: "$category",
                        product: { $first: "$$ROOT" }, // Get the first product per category
                    },
                },
                {
                    $replaceRoot: { newRoot: "$product" }, // Flatten the object
                },
            ]);

            if (
                !uniqueCategoryProducts ||
                uniqueCategoryProducts.length === 0
            ) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "No products found by category",
                });
            }

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "One product per category fetched successfully",
                data: uniqueCategoryProducts,
            });
        } catch (error) {
            console.error(
                "Error in getProductsByCategoryUnique:",
                error.message
            );
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}



export default UserController;
