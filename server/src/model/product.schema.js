import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        images: {
            type: [String],
            required: true,
            minlength: 1,
            maxlength: 4,
        },

        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: [
                "All",
                "Accessories",
                "Clothes",
                "Fitness",
                "Other",
                "Electronics",
            ],
            default: "All",
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
