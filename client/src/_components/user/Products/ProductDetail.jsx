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

    const normalizeImagePath = (path) => {
        if (!path) return "/placeholder-product.jpg";
        // Replace backslashes with forward slashes and ensure no double slashes
        const fixedPath = path.replace(/\\/g, "/").replace(/\/\//g, "/");
        return `http://localhost:1000/${fixedPath}`;
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart({
            id: product._id,
            title: product.title,
            price: product.price,
            quantity: quantity,
            image: product.images?.[0],
            stock: product.stock,
        });

        // Optional: Show a confirmation or navigate to cart
        navigate("/cart");
    };

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
                <Button onClick={fetchProduct} variant="default">
                    Retry
                </Button>
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

    const mainImage = normalizeImagePath(product.images?.[currentImageIndex]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <button
                onClick={() => navigate("/products")}
                className="flex items-center text-blue-600 hover:underline mb-6 text-sm md:text-base"
            >
                <span className="mr-1">←</span> Back to Products
            </button>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Image Section */}
                <div className="flex-1">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                            src={mainImage}
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
                                    className={`w-full h-20 overflow-hidden rounded-md border-2 transition-colors ${
                                        currentImageIndex === index
                                            ? "border-primary"
                                            : "border-transparent hover:border-gray-300"
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
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">
                            {product.title}
                        </h2>
                        {product.stock > 0 ? (
                            <span className="text-sm text-green-600">
                                In Stock ({product.stock} available)
                            </span>
                        ) : (
                            <span className="text-sm text-red-600">
                                Out of Stock
                            </span>
                        )}
                    </div>

                    <p className="text-2xl font-bold">
                        ${product.price?.toFixed(2) || "0.00"}
                    </p>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Description</h3>
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Category</h3>
                        <p className="text-gray-700 capitalize">
                            {product.category}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button
                            onClick={handleAddToCart}
                            disabled={product.stock <= 0}
                            className="flex-1"
                        >
                            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                handleAddToCart();
                                navigate("/cart");
                            }}
                            disabled={product.stock <= 0}
                            className="flex-1"
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
