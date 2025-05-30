import LoaderSpinner from "@/pages/LoaderSpinner";
import { axiosInstance } from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductCard from "./ProductCard";
import { SelectGroup } from "@radix-ui/react-select";

const Products = () => {
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [selectPriceRange] = useState(["low", "medium", "high"]);
    const [selectCategory] = useState([
        "All",
        "Accessories",
        "Electronics",
        "Clothes",
        "Fitness",
    ]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("low");

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get("/users/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setProducts(data.data || []);
            setFilteredProducts(data.data || []);
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

    // Apply filters whenever products, selectedCategory, selectedPrice, or searchTerm changes
    useEffect(() => {
        let result = [...products];

        // Apply category filter
        if (selectedCategory !== "All") {
            result = result.filter(
                (product) =>
                    product.category?.toLowerCase() ===
                    selectedCategory.toLowerCase()
            );
        }

        // Apply price filter
        if (selectedPrice === "low") {
            result.sort((a, b) => a.price - b.price);
        } else if (selectedPrice === "high") {
            result.sort((a, b) => b.price - a.price);
        } else if (selectedPrice === "medium") {
            // For medium, we might want to show mid-range products
            const avgPrice =
                products.reduce((sum, product) => sum + product.price, 0) /
                products.length;
            result = result.filter(
                (product) =>
                    product.price >= avgPrice * 0.7 &&
                    product.price <= avgPrice * 1.3
            );
        }

        // Apply search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (product) =>
                    product.name.toLowerCase().includes(term) ||
                    product.description.toLowerCase().includes(term) ||
                    product.category.toLowerCase().includes(term)
            );
        }

        setFilteredProducts(result);
    }, [products, selectedCategory, selectedPrice, searchTerm]);

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

    if (!filteredProducts || filteredProducts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] gap-4">
                <h1 className="text-2xl font-bold">
                    No Products Match Your Filters
                </h1>
                <button
                    onClick={() => {
                        setSelectedCategory("All");
                        setSelectedPrice("low");
                        setSearchTerm("");
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Reset Filters
                </button>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Products</h1>
                <span className="text-gray-500">
                    ({filteredProducts.length} products)
                </span>
            </div>

            <div className="mb-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-4 p-4 rounded-lg shadow-md">
                    {/* Select Category */}
                    <div className="w-full sm:w-auto">
                        <Select
                            value={selectedCategory}
                            onValueChange={setSelectedCategory}
                        >
                            <SelectTrigger className="w-full sm:w-[250px]">
                                <SelectValue placeholder="Select Your Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {selectCategory.map((elem, index) => (
                                    <SelectItem key={index} value={elem}>
                                        {elem}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Select Price Range */}
                    <div className="w-full sm:w-auto">
                        <Select
                            value={selectedPrice}
                            onValueChange={setSelectedPrice}
                        >
                            <SelectTrigger className="w-full sm:w-[250px] border rounded-md shadow-sm">
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {selectPriceRange.map((elem, index) => (
                                        <SelectItem key={index} value={elem}>
                                            {elem.charAt(0).toUpperCase() +
                                                elem.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Input */}
                    <div className="w-full">
                        <Input
                            placeholder="Search Here..."
                            className="w-full border rounded-md shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id || product._id}
                        onClick={() =>
                            navigate(`/products/${product.id || product._id}`)
                        }
                        className="cursor-pointer"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
