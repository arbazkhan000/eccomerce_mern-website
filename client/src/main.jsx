import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./_components/auth/LoginPage.jsx";
import RegisterPage from "./_components/auth/RegisterPage.jsx";
import Header from "./_components/Header.jsx";
import IndexPage from "./_components/layout/IndexPage.jsx";
import Cart from "./_components/user/Cart/Cart.jsx";
import ProductDetail from "./_components/user/Products/ProductDetail.jsx";
import Products from "./_components/user/Products/Products";
import { Toaster } from "./components/ui/toaster.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import "./index.css";
import Footer from "./pages/Footer.jsx";

// Common Layout
const MainLayout = () => (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
);

const ProtectRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("token") ? true : false;
    if (!isLoggedIn) {
        return <LoginPage />;
    }
    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
            {
                path: "products",
                element: (
                    <div>
                        <ProtectRoute>
                            <Products />
                        </ProtectRoute>
                    </div>
                ),
            },
            {
                path: "products/:id",
                element: (
                    <div>
                        <ProtectRoute>
                            <ProductDetail />
                        </ProtectRoute>
                    </div>
                ),
            },
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
        ],
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
