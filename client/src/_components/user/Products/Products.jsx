import LoaderSpinner from "@/pages/LoaderSpinner";
import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterMenu from "./FilterMenu";
import ProductCard from "./ProductCard";

const Products = () => {
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get("/users/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("All products", data);
            setProducts(data.data || []);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to fetch products. Please try again later."
            );
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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
                    onClick={fetchProducts}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">No Products Found</h1>
                <button
                    onClick={fetchProducts}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Refresh
                </button>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Products</h1>
                <span className="text-gray-500">
                    ( {products.length} products)
                </span>
            </div>

            <div className="mb-8">
                <FilterMenu />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        onClick={() =>
                            navigate(`/products/${product.id || product._id}`)
                        }
                        key={product.id || product._id}
                        product={product}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
