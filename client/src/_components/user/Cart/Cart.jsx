import { Button } from "@/components/ui/button";
import { useCart } from "@/Context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "../Products/QuantitySelector";

const Cart = () => {
    const { cartItems, updateQuantity, addQuantity } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (id, type) => {
        const item = cartItems.find((item) => item.id === id);
        if (!item) return;
        let newQty = parseInt(item.quantity, 10); // Ensure the quantity is numeric

        if (type === "inc") {
            newQty += 1;
        } else if (type === "dec" && newQty > 1) {
            newQty -= 1;
        }

        // Update quantity if it's numeric and greater than or equal to 1
        if (!isNaN(newQty) && newQty >= 1) {
            updateQuantity(id, newQty);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate("/products")}
                className="text-blue-600 hover:underline mb-6 text-sm"
            >
                &larr; Continue Shopping
            </button>

            <h1 className="text-3xl font-bold text-center mb-8">
                Your Shopping Cart
            </h1>

            {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
                    <ShoppingCart size={48} className="text-gray-400" />
                    <h2 className="text-xl font-semibold">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-500 max-w-sm">
                        You haven't added any products yet. Start browsing and
                        add something you love!
                    </p>
                    <Button onClick={() => navigate("/products")}>
                        Browse Products
                    </Button>
                </div>
            ) : (
                <div className="space-y-6">
                    {cartItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-lg border shadow-sm bg-white"
                        >
                            <div className="flex items-center gap-4 w-full md:w-2/3 border">
                                <img
                                    src={item.image || "/fallback.jpg"}
                                    alt={item.title}
                                    className="w-20 h-20 rounded-md object-cover border"
                                />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-medium">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2 mt-2">
                                    <QuantitySelector
                                        quantity={item.quantity}
                                        onIncrease={() =>
                                            handleQuantityChange(item.id, "inc")
                                        }
                                        onDecrease={() =>
                                            handleQuantityChange(item.id, "dec")
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end space-y-2">
                                <span className="text-lg font-semibold">
                                    $
                                    {parseFloat(
                                        item.price * item.quantity
                                    ).toFixed(2)}
                                </span>
                                <Button
                                    size="sm"
                                    className="w-full"
                                    onClick={() => alert("Buy Now logic here")}
                                >
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;
