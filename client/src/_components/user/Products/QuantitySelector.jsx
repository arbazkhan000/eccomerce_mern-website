import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const QuantitySelector = () => {
    const [quantity, setQuantity] = useState(1);

    const increase = () => setQuantity((prev) => prev + 1);
    const decrease = () => {
        if (quantity > 1) setQuantity((prev) => prev - 1);
    };

    return (
        <div className="flex items-center gap-4 w-fit border rounded-lg px-4 py-2 shadow-sm">
            <button
                onClick={decrease}
                className="text-gray-600 hover:text-red-500 transition"
                aria-label="Decrease quantity"
            >
                <Minus className="w-5 h-5" />
            </button>

            <span className="text-lg font-medium w-6 text-center">
                {quantity}
            </span>

            <button
                onClick={increase}
                className="text-gray-600 hover:text-green-500 transition"
                aria-label="Increase quantity"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
    );
};

export default QuantitySelector;
