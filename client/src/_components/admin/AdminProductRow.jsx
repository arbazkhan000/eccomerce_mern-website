import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const AdminProductRow = ({ product }) => {
    console.log("product", product);
    const [isDeleting, setIsDeleting] = useState(false);

    const safeProduct = {
        _id: product?._id || "",
        name: product?.name || "Unnamed Product",
        description: product?.description || "No description available",
        images: product?.images || [],
        category: product?.category || "Uncategorized",
        price: product?.price || 0,
        stock: product?.stock || 0,
    };

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/40?text=No+Image";
    };

    const handleEdit = () => {
        console.log("Edit product:", safeProduct._id);
    };

    const handleDelete = async () => {
        const confirm = window.confirm(
            `Are you sure you want to delete "${safeProduct.name}"?`
        );
        if (!confirm) return;

        setIsDeleting(true);
        try {
            await axiosInstance.delete(`/admin/products/${safeProduct._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast({
                title: "Product Deleted",
                description: `${safeProduct.name} has been successfully deleted.`,
            });
        } catch (error) {
            toast({
                title: "Delete Failed",
                description:
                    error.response?.data?.message || "Failed to delete product",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price || 0);
    };

    const getStockStatus = (stock) => {
        if (stock === 0)
            return { text: "Out of Stock", class: "bg-red-100 text-red-800" };
        if (stock < 10)
            return {
                text: `${stock} (Low)`,
                class: "bg-yellow-100 text-yellow-800",
            };
        return {
            text: `${stock} in stock`,
            class: "bg-green-100 text-green-800",
        };
    };

    const stockStatus = getStockStatus(safeProduct.stock);

    return (
        <>
            <div className="grid grid-cols-12 p-4 items-center text-sm hover:bg-gray-50 transition-colors">
                <div className="col-span-12 sm:col-span-4 flex items-center gap-3 mb-3 sm:mb-0">
                    <div className="relative">
                        <img
                            src={
                                safeProduct.images[0] ||
                                "https://via.placeholder.com/40?text=No+Image"
                            }
                            alt={safeProduct.name}
                            onError={handleImageError}
                            className="w-10 h-10 rounded object-cover ring-1 ring-gray-200"
                        />
                        {safeProduct.images.length > 1 && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                {safeProduct.images.length}
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 truncate">
                            {safeProduct.name}
                        </div>
                        <div className="text-xs text-gray-500 line-clamp-2 sm:line-clamp-1">
                            {safeProduct.description}
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block sm:col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {safeProduct.category}
                    </span>
                </div>

                <div className="col-span-6 sm:col-span-2">
                    <div className="font-semibold text-gray-900">
                        {formatPrice(safeProduct.price)}
                    </div>
                    <div className="text-xs text-gray-500 sm:hidden">
                        {safeProduct.category}
                    </div>
                </div>

                <div className="col-span-6 sm:col-span-2">
                    <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus.class}`}
                    >
                        {stockStatus.text}
                    </span>
                </div>

                <div className="col-span-12 sm:col-span-2 flex gap-1 justify-start sm:justify-end mt-3 sm:mt-0">
                    <button
                        onClick={handleEdit}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                        title="Edit Product"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete Product"
                    >
                        <Trash2
                            className={`w-4 h-4 ${
                                isDeleting ? "animate-pulse" : ""
                            }`}
                        />
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminProductRow;
