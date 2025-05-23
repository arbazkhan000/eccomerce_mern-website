import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
// import LoadingSpinner from "@/components/LoadingSpinner";

const ProductCard = ({ product, index, onClick }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    // Normalize image path by replacing backslashes with forward slashes
    const normalizeImagePath = (path) => {
        if (!path) return null;
        return path.replace(/\\/g, "/");
    };

    // Get the first available image
    const getProductImage = () => {
        if (!product.images || product.images.length === 0) return null;
        return normalizeImagePath(product.images[0]); // Use first image instead of [2]
    };

    const productImage = getProductImage();

    return (
        <motion.div
            className="group relative overflow-hidden rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1],
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <div className="block" onClick={onClick}>
                <div className="aspect-square overflow-hidden relative bg-gray-100">
                    {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex justify-center items-center">
                                <motion.div
                                    style={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: "50%",
                                        border: "3px solid rgba(0, 0, 0, 0.2)",
                                        borderTopColor: "#000",
                                    }}
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                />
                            </div>
                        </div>
                    )}
                    <img
                        src={
                            imageError || !productImage
                                ? "/placeholder-product.jpg"
                                : `http://localhost:1000/${productImage}`
                        }
                        alt={product.title}
                        className={`h-full w-full object-cover object-center transition-transform group-hover:scale-105 ${
                            imageLoading ? "opacity-0" : "opacity-100"
                        }`}
                        onLoad={() => setImageLoading(false)}
                        onError={() => {
                            setImageError(true);
                            setImageLoading(false);
                        }}
                    />
                </div>
                <div className="p-4">
                    <motion.h3
                        className="text-base font-medium line-clamp-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                        {product.title}
                    </motion.h3>
                    {product.category && (
                        <motion.p
                            className="mt-1 text-sm text-gray-500 capitalize"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.3 + index * 0.1,
                            }}
                        >
                            {product.category}
                        </motion.p>
                    )}
                    <motion.p
                        className="mt-2 font-medium text-gray-900"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                        ${product.price?.toFixed(2) || "0.00"}
                    </motion.p>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
