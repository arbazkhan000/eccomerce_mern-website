import { useCart } from "@/Context/CartContext";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOutToogle from "./admin/LogOutToogle";

const Header = () => {
    const menubar = [
        { id: 1, label: "Home", url: "/" },
        { id: 2, label: "Products", url: "/products" },
        { id: 3, label: "About", url: "/about" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const {cartItems} = useCart();

    return (
        <header className="w-full border-b bg-white sticky top-0 z-50 shadow-md">
            <div className="flex justify-between items-center h-20 px-4 sm:px-8">
                {/* Logo */}
                <h2 className="text-2xl font-bold">Luxe</h2>

                {/* Desktop Menu */}
                <ul className="hidden md:flex list-none items-center space-x-8">
                    {menubar.map((item) => (
                        <li
                            key={item.id}
                            className="font-medium text-[18px] hover:text-blue-500 transition"
                        >
                            <Link to={item.url}>{item.label}</Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side */}
                <div className="flex items-center space-x-4">
                    {token ? (
                        <LogOutToogle />
                    ) : (
                        <Link to="/login">
                            <User
                                strokeWidth={1.3}
                                size={28}
                                className="cursor-pointer"
                            />
                        </Link>
                    )}

                    {/* Cart */}
                    <span
                        onClick={() => navigate("/cart")}
                        className="relative cursor-pointer"
                    >
                        <ShoppingCart size={28} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                )}
                            </span>
                        )}
                    </span>

                    {/* Mobile Menu Icon */}
                    <button
                        className="md:hidden cursor-pointer"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t transition-all duration-300">
                    <ul className="flex flex-col items-start p-4 space-y-4">
                        {menubar.map((item) => (
                            <li
                                key={item.id}
                                className="text-lg font-medium hover:text-blue-500 transition"
                            >
                                <Link
                                    to={item.url}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Header;
