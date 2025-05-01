import { Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogOutToogle from "./admin/LogOutToogle";

const Header = () => {
    const menubar = [
        { id: 1, label: "Home", url: "#" },
        { id: 2, label: "Products", url: "/products" },
        { id: 3, label: "Categories", url: "#" },
        { id: 4, label: "About", url: "#" },
    ];

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

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
                            <a href={item.url}>{item.label}</a>
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
                    <span onClick={() => navigate("/cart")}>
                        <ShoppingCart size={28} />
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
