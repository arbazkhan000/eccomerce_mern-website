import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { useState } from "react";

const FilterMenu = () => {
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

    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start w-full gap-4 p-4 rounded-lg shadow-md">
            {/* Select Category */}
            <div className="w-full sm:w-auto">
                <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                >
                    <SelectTrigger className="w-full sm:w-[250px] border rounded-md shadow-sm">
                        <SelectValue placeholder="Select Your Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {selectCategory.map((elem, index) => (
                                <SelectItem key={index} value={elem}>
                                    {elem}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Select Range */}
            <div className="w-full sm:w-auto">
                <Select value={selectedPrice} onValueChange={setSelectedPrice}>
                    <SelectTrigger className="w-full sm:w-[250px] border rounded-md shadow-sm">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {selectPriceRange.map((elem, index) => (
                                <SelectItem key={index} value={elem}>
                                    {elem}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Input Search */}
            <div className="w-full">
                <Input
                    placeholder="Search Here..."
                    className="w-full border rounded-md shadow-sm"
                />
            </div>
        </div>
    );
};

export default FilterMenu;
