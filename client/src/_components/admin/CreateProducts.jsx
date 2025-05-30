import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Loader2, X } from "lucide-react";
import { useState } from "react";

const CreateProducts = () => {
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productQuantity, setProductQuantity] = useState("");
    const [productCategory] = useState([
        "Electronics",
        "Phone",
        "Keyboard",
        "Mouse",
        "Headphone",
    ]);
    const [productImages, setProductImages] = useState([]);
    const [loading, setLoading] = useState(true);
    // Handle multiple file uploads
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files) {
            const uploadedImages = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setProductImages((prevImages) => [
                ...prevImages,
                ...uploadedImages,
            ]);
        }
    };

    // Delete a specific image
    const deleteImage = (imageUrl) => {
        setProductImages((prevImages) =>
            prevImages.filter((image) => image !== imageUrl)
        );
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <CardHeader className="mb-6 text-center">
                <CardTitle className="text-2xl md:text-3xl font-bold">
                    Add New Product
                </CardTitle>
                <CardDescription className="text-gray-600">
                    Enter the details for the new product you want to add to
                    your e-commerce store.
                </CardDescription>
            </CardHeader>

            {/* Form */}
            <form className="space-y-6">
                {/* Grid Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <Label
                            htmlFor="product-name"
                            className="mb-2 text-sm font-medium"
                        >
                            Product Name
                        </Label>
                        <Input
                            id="product-name"
                            placeholder="Enter your product name"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="description"
                            className="mb-2 text-sm font-medium"
                        >
                            Description
                        </Label>
                        <input
                            id="description"
                            placeholder="Enter product description"
                            value={productDesc}
                            onChange={(e) => setProductDesc(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="price"
                            className="mb-2 text-sm font-medium"
                        >
                            Price
                        </Label>
                        <input
                            id="price"
                            type="number"
                            placeholder="0.00"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="stock-quantity"
                            className="mb-2 text-sm font-medium"
                        >
                            Stock Quantity
                        </Label>
                        <input
                            id="stock-quantity"
                            type="number"
                            placeholder="Enter stock quantity"
                            value={productQuantity}
                            onChange={(e) => setProductQuantity(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <Label
                        htmlFor="category"
                        className="mb-2 text-sm font-medium"
                    >
                        Category
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {productCategory.map((item) => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {/* Image Upload */}
                <div>
                    <Label
                        htmlFor="product-image"
                        className="mb-2 text-sm font-medium"
                    >
                        Product Images
                    </Label>
                    <div className="space-y-4">
                        {/* Uploaded Images */}
                        <div className="flex flex-wrap gap-4">
                            {productImages?.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden"
                                >
                                    <img
                                        className="w-full h-full object-cover"
                                        src={image}
                                        alt={`Product Preview ${index + 1}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteImage(image)}
                                        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-sm hover:bg-gray-100"
                                    >
                                        <X className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* File input */}
                        <input
                            id="product-image"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className=" w-full ">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        // className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
                    >
                        {loading ? (
                            "Add Products..."
                        ) : (
                            <Loader2 className="animate-spin" />
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateProducts;
