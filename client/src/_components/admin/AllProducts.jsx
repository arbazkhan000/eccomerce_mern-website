import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

const AllProducts = () => {
    const [productCategory] = useState([
        "Electronics",
        "Phone",
        "Keyboard",
        "Mouse",
        "Headphone",
    ]);
    const [selectedCategory, setSelectedCategory] = useState("");

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Our Products</h2>
            <div className="flex flex-col md:flex-row gap-5">
                {/* Search product */}
                <div className="w-full">
                    <Label
                        htmlFor="search-product"
                        className="block mb-2 text-sm  font-medium"
                    >
                        Search Product
                    </Label>
                    <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm ">
                        <Search className="text-gray-500 mr-2" />
                        <Input
                            id="search-product"
                            placeholder="Search Product..."
                            className="w-full border-none outline-none"
                            aria-label="Search products"
                        />
                    </div>
                </div>

                {/* Search category */}
                <div className="w-[200px]">
                    <Label
                        htmlFor="search-category"
                        className="block mb-2 text-sm font-medium"
                    >
                        Search Category
                    </Label>
                    <Select
                        onValueChange={(value) => setSelectedCategory(value)}
                        aria-label="Search category"
                    >
                        <SelectTrigger id="search-category" className="w-full">
                            <SelectValue
                                placeholder="Select a category"
                                className="text-gray-600"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {productCategory.map((category, index) => (
                                    <SelectItem key={index} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Display Selected Category */}
            <div className="mt-4">
                {selectedCategory ? (
                    <p className="text-lg">
                        Selected Category:{" "}
                        <span className="font-medium ">{selectedCategory}</span>
                    </p>
                ) : (
                    <p className="text-gray-500">No category selected.</p>
                )}
            </div>
        </div>
    );
};

export default AllProducts;
