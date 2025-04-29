import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuantitySelector from "./QuantitySelector";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [products] = useState([
        {
            id: 1,
            img: "https://example.com/image1-1.jpg",
            images: [
                "https://example.com/image1-1.jpg",
                "https://example.com/image1-2.jpg",
                "https://example.com/image1-3.jpg",
            ],
            title: "Product 1",
            Category: "Category 1",
            price: 49.99,
        },
        {
            id: 2,
            img: "https://example.com/image2-1.jpg",
            images: [
                "https://example.com/image2-1.jpg",
                "https://example.com/image2-2.jpg",
            ],
            title: "Product 2",
            Category: "Category 2",
            price: 89.99,
        },
        {
            id: 3,
            img: "https://example.com/image3-1.jpg",
            images: [
                "https://example.com/image3-1.jpg",
                "https://example.com/image3-2.jpg",
                "https://example.com/image3-3.jpg",
                "https://example.com/image3-4.jpg",
            ],
            title: "Product 3",
            Category: "Category 3",
            price: 129.99,
        },
        {
            id: 4,
            img: "https://example.com/image4-1.jpg",
            images: [
                "https://example.com/image4-1.jpg",
                "https://example.com/image4-2.jpg",
            ],
            title: "Product 4",
            Category: "Category 4",
            price: 199.99,
        },
        {
            id: 5,
            img: "https://example.com/image5-1.jpg",
            images: [
                "https://example.com/image5-1.jpg",
                "https://example.com/image5-2.jpg",
                "https://example.com/image5-3.jpg",
            ],
            title: "Product 5",
            Category: "Category 4",
            price: 149.99,
        },
        {
            id: 6,
            img: "https://example.com/image6-1.jpg",
            images: [
                "https://example.com/image6-1.jpg",
                "https://example.com/image6-2.jpg",
                "https://example.com/image6-3.jpg",
            ],
            title: "Product 6",
            Category: "Category 2",
            price: 119.99,
        },
        {
            id: 7,
            img: "https://example.com/image7-1.jpg",
            images: [
                "https://example.com/image7-1.jpg",
                "https://example.com/image7-2.jpg",
            ],
            title: "Product 7",
            Category: "Category 3",
            price: 179.99,
        },
        {
            id: 8,
            img: "https://img.freepik.com/free-vector/vintage-beautiful-watches-design-concept_1284-38365.jpg?ga=GA1.1.395377891.1745469847&semt=ais_hybrid&w=740",
            images: [
                "https://img.freepik.com/free-photo/close-up-clock-with-time-change_23-2149241142.jpg?ga=GA1.1.395377891.1745469847&semt=ais_hybrid&w=740",
                "https://img.freepik.com/free-vector/classic-watches-interface_250435-186.jpg?ga=GA1.1.395377891.1745469847&semt=ais_hybrid&w=740",
                "https://img.freepik.com/free-vector/classic-watches-interface_250435-186.jpg?ga=GA1.1.395377891.1745469847&semt=ais_hybrid&w=740",
            ],
            title: "Product 8",
            Category: "Category 1",
            price: 209.99,
        },
    ]);

    const product = products.find((product) => product.id === parseInt(id));
    console.log(product);

    if (product?.length === 0) {
        return <div className="text-center mt-10 text-xl">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <button
                onClick={() => navigate("/products")}
                className="mb-6 text-blue-600 hover:underline"
            >
                &larr; Back to Products
            </button>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Image Section */}
                <div className="flex-1">
                    <img
                        src={product?.img}
                        alt={product?.title}
                        className="w-full h-auto rounded-lg shadow-lg object-cover"
                    />

                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <img
                            src={product?.images[0]}
                            alt={product?.title}
                            className="w-full h-20 object-cover rounded-md"
                        />
                        <img
                            src={product?.images[1]}
                            alt={product?.title}
                            className="w-full h-20 object-cover rounded-md"
                        />
                        <img
                            src={product?.images[2]}
                            alt={product?.title}
                            className="w-full h-20 object-cover rounded-md"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                        {product?.title}
                    </h2>
                    <p className="text-xl text-green-600 font-bold">
                        ${product?.price.toFixed(2)}
                    </p>

                    <div>
                        <label className="block text-gray-600 font-medium mb-1">
                            Description
                        </label>
                        <p className="text-gray-700">
                            Category: {product?.Category}
                        </p>
                    </div>

                    <QuantitySelector />

                    <Button className="mt-4 w-full md:w-auto">
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
