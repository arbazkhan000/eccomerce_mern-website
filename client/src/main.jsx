import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import CheckOutProduct from "./_components/CheckOutProduct.jsx";
import Header from "./_components/Header.jsx";
import IndexPage from "./_components/layout/IndexPage.jsx";
import ProductDetail from "./_components/user/Products/ProductDetail.jsx";
import Products from "./_components/user/Products/Products";
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
                element: <Products />,
            },
            {
                path: "products/:id",
                element: <ProductDetail />,
            },
            {
                path: "about",
                element: <CheckOutProduct />,
            },
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
