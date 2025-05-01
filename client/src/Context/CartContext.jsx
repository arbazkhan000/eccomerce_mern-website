import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load the cart items from localStorage on initial render
    const loadCartItems = () => {
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    };

    const [cartItems, setCartItems] = useState(loadCartItems());

    useEffect(() => {
        // Save cart items to localStorage whenever they change
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    // Update quantity of an item in the cart
    const updateQuantity = (id, quantity) => {
        setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    // Add one to the quantity of an item in the cart
    const addQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Add a new item to the cart
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, addQuantity }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
