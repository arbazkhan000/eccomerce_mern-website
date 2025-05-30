import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/pages/LoaderSpinner";
import { axiosInstance } from "@/utils/axiosInstance";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BannerImage from "../../assets/Banner_image.jpg";
import HeadphoneImage from "../../assets/feature product headphone.avif";
import WatchImage from "../../assets/feature product image1.avif";
import LampImage from "../../assets/feature product lamp.avif";
import ProductCard from "../user/Products/ProductCard";

const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.2,
            staggerChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
        },
    },
};

const IndexPage = () => {
    //     {
    //         id: 1,
    //         img: WatchImage,
    //         title: "Minimalist Watch",
    //         Category: "Accessories",
    //         price: 49.99,
    //     },
    //     {
    //         id: 2,
    //         img: LampImage,
    //         title: "Modern Desk Lamp",
    //         Category: "Home",
    //         price: 89.99,
    //     },
    //     {
    //         id: 3,
    //         img: BagImage,
    //         title: "Canvas Backpack",
    //         Category: "Accessories",
    //         price: 129.99,
    //     },
    //     {
    //         id: 4,
    //         img: HeadphoneImage,
    //         title: "Wireless Headphones",
    //         Category: "Electronics",
    //         price: 129.99,
    //     },
    // ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const [catageroyProducts] = useState([
        {
            id: 1,
            img: WatchImage,
            title: "Minimalist Watch",
            Category: "Accessories",
        },
        {
            id: 2,
            img: LampImage,
            title: "Modern Desk Lamp",
            Category: "Home",
        },
        {
            id: 3,
            img: HeadphoneImage,
            title: "Wireless Headphones",
            Category: "Electronics",
        },
    ]);

    const navigate = useNavigate();

    //api calling desc one product per unique category
    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const { data } = await axiosInstance.get(
                "/users/unique-category-products",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            console.log("unique category products", data);
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderSpinner />
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center ">
            {/* Hero Section */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={heroVariants}
                className="relative w-full h-[80vh]"
            >
                <motion.img
                    src={BannerImage}
                    alt="Shop Background"
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16">
                    <motion.h1
                        variants={itemVariants}
                        className="text-gray-200 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight  mb-4"
                    >
                        Shop the Latest <br /> Trends
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-200 text-base sm:text-lg md:text-xl max-w-md mb-6 p-2 rounded"
                    >
                        Discover curated collections of premium products for
                        your lifestyle
                    </motion.p>
                    <motion.div variants={itemVariants}>
                        <Button>Shop Now</Button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Featured Products Section */}
            <motion.section
                className="w-full px-4 sm:px-6 md:px-10 py-16 max-w-screen-xl mx-auto bg-gray-200"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
                    variants={itemVariants}
                >
                    Featured Products
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-10"
                    variants={itemVariants}
                >
                    Our curated selection of trending items just for you
                </motion.p>

                {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <ProductCard
                                onClick={() => navigate("/products")}
                                key={product.id || product._id}
                                product={product}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600 text-sm sm:text-base md:text-lg">
                            No products available
                        </div>
                    )}
                </div> */}
            </motion.section>

            {/* Shop by Category Section */}
            <motion.section
                className="w-full px-4 sm:px-6 md:px-10 py-16 max-w-screen-xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={heroVariants}
            >
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4"
                    variants={itemVariants}
                >
                    Shop by Category
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-sm sm:text-base md:text-lg text-center mb-10"
                    variants={itemVariants}
                >
                    Browse our collections by category to find exactly what you
                    need
                </motion.p>

                <div className="flex items-start justify-center flex-wrap  gap-6">
                    {catageroyProducts.map((product, index) => (
                        <motion.div
                            onClick={() => navigate("/products")}
                            key={index}
                            className="relative min-w-[300px] h-64 rounded-xl overflow-hidden shadow-md"
                            variants={itemVariants}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1, // Staggered animation
                                ease: [0.23, 1, 0.32, 1], // Custom easing
                            }}
                            whileHover={{
                                y: -5,
                                transition: { duration: 0.2 },
                            }}
                            style={{
                                backgroundImage: `url(${product.img})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center p-4">
                                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                                    {product.title}
                                </h2>
                                <p className="text-sm md:text-base mb-4 hidden sm:block">
                                    {product.Category}
                                </p>
                                <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition text-xs sm:text-sm md:text-base">
                                    Shop {product.title}
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Join Our Newsletter */}

            <section>
                <div className="bg-[#000000] py-16 px-4 sm:px-6 md:px-10 max-w-screen-xl mx-auto text-center rounded-lg">
                    <h2 className="text-[#FFFFFF] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        Join Our Newsletter
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6">
                        Stay updated with the latest trends and exclusive offers
                    </p>
                    <form
                        onSubmit={(e) => e.preventDefault()}
                        className="flex items-start justify-center space-x-5"
                        action=""
                    >
                        <input
                            className="p-2 outline-none border-none rounded w-[500px]"
                            type="text"
                            name=""
                            id=""
                        />
                        <Button>Subscribe</Button>
                    </form>
                </div>
            </section>

            {/* footer */}
            <section className="mt-10">{/* <Footer /> */}</section>
        </div>
    );
};

export default IndexPage;
