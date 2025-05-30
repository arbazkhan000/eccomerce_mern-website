import { StatusCodes } from "http-status-codes";
import Product from "../model/product.schema.js";
import fs from 'fs';
import path from 'path';

class AdminController {
    // @desc   Admin create a new product
    static async createProduct(req, res) {
        const { title, price, description, category, stock } = req.body;

        try {
            // Validate required fields
            if (!title || !price || !description || !category) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "All fields are required!",
                });
            }

            // Validate image files
            if (!req.files || req.files.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    success: false,
                    message: "At least one image is required!",
                });
            }

            console.log("Req.files",req.files)

            // Convert file objects to file paths
            const imagePaths = req.files.map((file) => file.path);
            console.log("Image path",imagePaths)

            // Create and save product
            const newProduct = new Product({
                title,
                images: imagePaths,
                price,
                description,
                category,
                stock: stock || 0,
            });

            await newProduct.save();

            return res.status(StatusCodes.CREATED).json({
                success: true,
                message: "Product created successfully",
                data: newProduct,
            });
        } catch (error) {
            console.error("Error in createProduct:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @desc   Admin update product
    static async updateProduct(req, res) {
        const { id } = req.params;
        const { title, price, description, category, stock } = req.body;

        try {
            // Find the product first
            const product = await Product.findById(id);

            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Product not found!",
                });
            }

            // Create update object with basic fields
            const updateData = {
                title: title || product.title,
                price: price || product.price,
                description: description || product.description,
                category: category || product.category,
                stock: stock !== undefined ? stock : product.stock,
            };

            // Handle image updates if files are uploaded
            if (req.files && req.files.length > 0) {
                const imagePaths = req.files.map((file) => file.path);
                updateData.images = imagePaths;
            }

            // Update the product
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Product not found!",
                });
            }

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Product updated successfully",
                data: updatedProduct,
            });
        } catch (error) {
            console.error("Error in updateProduct:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @desc   Admin delete product
    static async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            const product = await Product.findById(id);

            if (!product) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    success: false,
                    message: "Product not found!",
                });
            }

            // Delete each image from file system
            if (product.images?.length) {
                product.images.forEach((imagePath) => {
                    const fullPath = path.resolve(imagePath);
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error(
                                `Failed to delete image: ${imagePath}`,
                                err.message
                            );
                        }
                    });
                });
            }

            // Delete the product from the database
            await Product.findByIdAndDelete(id);

            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Product deleted successfully",
            });
        } catch (error) {
            console.error("Error in deleteProduct:", error.message);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    // @desc   Admin get all products
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
}

export default AdminController;
