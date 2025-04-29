import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard";
import FilterMenu from "./FilterMenu";

const Products = () => {
    const navigate = useNavigate();
    const [featuredProducts] = useState([
        {
            id: 1,
            img: "https://example.com/image1.jpg",
            title: "Product 1",
            Category: "Category 1",
            price: 49.99,
        },
        {
            id: 2,
            img: "https://example.com/image2.jpg",
            title: "Product 2",
            Category: "Category 2",
            price: 89.99,
        },
        {
            id: 3,
            img: "https://example.com/image3.jpg",
            title: "Product 3",
            Category: "Category 3",
            price: 129.99,
        },
        {
            id: 4,
            img: "https://example.com/image4.jpg",
            title: "Product 4",
            Category: "Category 4",
            price: 199.99,
        },
        {
            id: 5,
            img: "https://example.com/image4.jpg",
            title: "Product 5",
            Category: "Category 4",
            price: 199.99,
        },
        {
            id: 6,
            img: "https://example.com/image4.jpg",
            title: "Product 6",
            Category: "Category 4",
            price: 199.99,
        },
        {
            id: 7,
            img: "https://example.com/image4.jpg",
            title: "Product 7",
            Category: "Category 4",
            price: 199.99,
        },
        {
            id: 8,
            img: "https://example.com/image4.jpg",
            title: "Product 8",
            Category: "Category 4",
            price: 199.99,
        },
    ]);

    return (
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8">
            <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">
                All Products
            </h1>

            {/* Filter Menu */}
            <div className="mb-8">
                <FilterMenu />
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product, index) => (
                    <ProductCard
                        onClick={() => navigate(`/products/${product.id}`)}
                        key={product.id}
                        product={product}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;
