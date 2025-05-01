import { Button } from "@/components/ui/button";
import { useCart } from "@/Context/CartContext";
import LoaderSpinner from "@/pages/LoaderSpinner";
import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const fetchProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get(`/users/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setProduct(data.data);
        } catch (error) {
            setError(
                error.response?.data?.message || "Failed to fetch product"
            );
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <LoaderSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <h1 className="text-2xl font-bold text-red-500">{error}</h1>
                <button
                    onClick={fetchProduct}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">Product not found</h1>
                <Button onClick={() => navigate("/products")}>
                    Back to Products
                </Button>
            </div>
        );
    }

    const normalizeImagePath = (path) => {
        if (!path) return "/placeholder-product.jpg";
        const fixedPath = path.replace(/\\/g, "/");
        return `http://localhost:1000/${fixedPath}`;
    };

    const mainImage =
        product.images?.[currentImageIndex] ||
        product.images?.[0] ||
        "/placeholder-product.jpg";

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <button
                onClick={() => navigate("/products")}
                className="mb-6 text-blue-600 hover:underline"
            >
                &larr; Back to Products
            </button>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Image Section */}
                <div className="flex-1">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={normalizeImagePath(mainImage)}
                            alt={product.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.src = "/placeholder-product.jpg";
                            }}
                        />
                    </div>

                    {product.images?.length > 1 && (
                        <div className="grid grid-cols-4 gap-2 mt-4">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-full h-20 overflow-hidden rounded-md border-2 ${
                                        currentImageIndex === index
                                            ? "border-blue-500"
                                            : "border-transparent"
                                    }`}
                                >
                                    <img
                                        src={normalizeImagePath(img)}
                                        alt={`${product.title} thumbnail ${
                                            index + 1
                                        }`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src =
                                                "/placeholder-product.jpg";
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        {product.title}
                    </h2>
                    <p className="text-xl text-green-600 font-bold">
                        ${product.price?.toFixed(2) || "0.00"}
                    </p>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Description
                        </label>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Category
                        </label>
                        <p className="text-gray-700 capitalize">
                            {product.category}
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            addToCart({
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                quantity,
                                image: product.images?.[0],
                            });
                            navigate("/cart");
                            console.log("quantity", quantity);
                        }}
                        className="mt-4 w-full md:w-auto"
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
