import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/utils/axiosInstance";
import { Label } from "@radix-ui/react-label";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AdminProductRow from "./AdminProductRow";

const AdminDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get("/admin/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            // Access products from the data field of the response
            const productsArray = Array.isArray(data.data) ? data.data : [];
            setProducts(productsArray);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch products");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Filtered products based on search query
    const filteredProducts = Array.isArray(products)
        ? products.filter(
              (product) =>
                  product.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                  product.description
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
          )
        : [];

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold">Our Products</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your product inventory
                </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
                <div className="flex-1 min-w-0">
                    <Label
                        htmlFor="search-product"
                        className="block mb-2 text-sm font-medium"
                    >
                        Search Product
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <Input
                            id="search-product"
                            placeholder="Search by name, description..."
                            className="pl-10 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Loading and Error States */}
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <p>Loading products...</p>
                </div>
            )}

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md mb-4">
                    {error}
                </div>
            )}

            {/* Products Table */}
            <div className="overflow-x-auto rounded-lg border shadow-sm">
                <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-4 text-sm font-medium text-gray-500">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-2">Price</div>
                    <div className="col-span-2">Stock</div>
                    <div className="col-span-2">Actions</div>
                </div>

                <div className="divide-y">
                    {filteredProducts?.map(
                        (product) => (
                            console.log("Rendering product:", product),
                            (
                                <AdminProductRow
                                    key={product._id}
                                    product={product}
                                />
                            )
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
