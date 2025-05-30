import { Button } from "@/components/ui/button";
import { useCart } from "@/Context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QuantitySelector from "../Products/QuantitySelector";

const Cart = () => {
    // Get cart items and functions from the cart context
    const { cartItems, updateQuantity, removeFromCart } = useCart();
    console.log("cartItems", cartItems);
    const navigate = useNavigate();

    // Handle quantity changes (increase or decrease)
    const handleQuantityChange = (id, type) => {
        // Find the item in the cart
        const item = cartItems.find((item) => item.id === id);
        if (!item) return;

        // Convert quantity to number (just in case it's a string)
        let newQty = parseInt(item.quantity, 10);

        // Increase or decrease quantity based on the type
        if (type === "inc") {
            newQty += 1;
        } else if (type === "dec" && newQty > 1) {
            newQty -= 1;
        }

        // Only update if the new quantity is valid
        if (!isNaN(newQty) && newQty >= 1) {
            updateQuantity(id, newQty);
        }
    };

    // Calculate total price of all items in cart
    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0)
            .toFixed(2);
    };


    return (
        <div className="max-w-5xl mx-auto px-4 py-8 min-h-screen">
            {/* Back to shopping button */}
            <button
                onClick={() => navigate("/products")}
                className="flex items-center text-blue-600 hover:underline mb-6 text-sm md:text-base"
            >
                <span className="mr-1">←</span> Continue Shopping
            </button>

            {/* Cart title */}
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Your Shopping Cart
            </h1>

            {/* Empty cart state */}
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
                    <Button
                        onClick={() => navigate("/products")}
                        className="mt-4"
                    >
                        Browse Products
                    </Button>
                </div>
            ) : (
                <>
                    {/* Cart items list */}
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg border shadow-sm bg-white"
                            >
                                {/* Product image and info */}
                                <div className="flex items-center gap-4 w-full sm:w-2/3">
                                    <img
                                        src={
                                            item.image
                                                ? `http://localhost:1000/${item.image.replace(
                                                      /\\/g,
                                                      "/"
                                                  )}`
                                                : "/fallback.jpg"
                                        }
                                        alt={item.title}
                                        className="w-16 h-16 md:w-20 md:h-20 rounded-md object-cover border"
                                        onError={(e) => {
                                            e.target.src = "/fallback.jpg";
                                        }}
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-base md:text-lg font-medium">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ${item.price.toFixed(2)} each
                                        </p>
                                    </div>
                                </div>

                                {/* remove button */}

                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="mt-2 w-full sm:w-auto"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </Button>

                                {/* Quantity controls */}
                                <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-4">
                                    <QuantitySelector
                                        quantity={item.quantity}
                                        onIncrease={() =>
                                            handleQuantityChange(item.id, "inc")
                                        }
                                        onDecrease={() =>
                                            handleQuantityChange(item.id, "dec")
                                        }
                                        className="w-24"
                                    />

                                    {/* Price and buy button */}
                                    <div className="flex flex-col items-end">
                                        <span className="text-base md:text-lg font-semibold">
                                            $
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </span>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="mt-2 w-full sm:w-auto"
                                            onClick={() =>
                                                alert("Buy Now logic here")
                                            }
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart summary */}
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold">
                                Order Summary
                            </h3>
                            <span className="text-lg font-bold">
                                ${calculateTotal()}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Shipping and taxes calculated at checkout
                        </p>
                        <Button className="w-full mt-6 py-2 text-lg">
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
