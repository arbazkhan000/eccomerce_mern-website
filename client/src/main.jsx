import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import "./index.css";

// Layouts

import AdminLayout from "./_components/layout/AdminLayout.jsx";

// Pages
import LoginPage from "./_components/auth/LoginPage.jsx";
import RegisterPage from "./_components/auth/RegisterPage.jsx";
import About from "./pages/About.jsx";

// User Components
import AdminDashboard from "./_components/admin/AdminDashboard.jsx";
import Header from "./_components/Header.jsx";
import Cart from "./_components/user/Cart/Cart.jsx";
import ProductDetail from "./_components/user/Products/ProductDetail.jsx";
import Products from "./_components/user/Products/Products";
import Footer from "./pages/Footer.jsx";

// Admin Components

// Auth Protection Components
const ProtectRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token") ? true : false;
    return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const ProtectedAdmin = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token") ? true : false;
    const isAdmin = localStorage.getItem("admin") === "true";

    if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (!isAdmin) return <Navigate to="/login" replace />;
    return children;
};


// RoleRedirect.jsx

const RoleRedirect = () => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("admin") === "true";

    if (!token) return <Navigate to="/login" replace />; // not logged in
    if (isAdmin) return <Navigate to="/admin" replace />; // admin
    return <Navigate to="/products" replace />; // normal user
};

export default RoleRedirect;

const MainLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

// Route Configuration
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <RoleRedirect />, // ✅ redirect user based on role
            },
            { path: "about", element: <About /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            {
                path: "products",
                children: [
                    { index: true, element: <Products /> },
                    { path: ":id", element: <ProductDetail /> },
                ],
            },
            {
                path: "cart",
                element: (
                    <ProtectRoute>
                        <Cart />
                    </ProtectRoute>
                ),
            },
        ],
    },
    {
        path: "/admin",
        element: (
            <ProtectedAdmin>
                <AdminLayout />
            </ProtectedAdmin>
        ),
        children: [
            { index: true, element: <AdminDashboard /> },
            // { path: "create-products", element: <CreateProducts /> },
            // { path: "products", element: <ProductList /> },
            // Add more admin routes here
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CartProvider>
            <RouterProvider router={router} />
            <Toaster />
        </CartProvider>
    </StrictMode>
);
