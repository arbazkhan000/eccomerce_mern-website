// QuantitySelector.jsx
import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, onIncrease, onDecrease }) => {
    return (
        <div className="flex items-center gap-4 w-fit border rounded-lg px-4 py-2 shadow-sm">
            <button
                onClick={onDecrease}
                className="text-gray-600 hover:text-red-500 transition"
                aria-label="Decrease quantity"
            >
                <Minus className="w-5 h-5" />
            </button>

            <span className="text-lg font-medium w-6 text-center">
                {quantity}
            </span>

            <button
                onClick={onIncrease}
                className="text-gray-600 hover:text-green-500 transition"
                aria-label="Increase quantity"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
    );
};

export default QuantitySelector;
