import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index }) => {
    console.log(product);
    return (
        <motion.div
            className="group relative overflow-hidden rounded-lg border bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1, // Staggered animation
                ease: [0.23, 1, 0.32, 1], // Custom easing
            }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                    <motion.img
                        src={`${product.img}?w=500&auto=format`}
                        alt={product.title}
                        className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="p-4">
                    <motion.h3
                        className="text-base font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    >
                        {product.title}
                    </motion.h3>
                    <motion.p
                        className="mt-1 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                        {product.Category.length > 50
                            ? `${product.Category.slice(0, 50)}...`
                            : product.Category}
                        {/* {product.category.charAt(0).toUpperCase() +
                            product.category.slice(1)} */}
                    </motion.p>
                    <motion.p
                        className="mt-2 font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                        ${product.price.toFixed(2)}
                    </motion.p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
