import { useState } from "react";
import { motion } from "framer-motion";

const About = () => {
    const [auth, setAuth] = useState({
        email: "",
        textarea: "",
        name: "",
    });

    const handelChange = (e) => {
        const { name, value } = e.target;

        setAuth((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handelForm = (e) => {
        e.preventDefault();

        const { name, email, textarea } = auth;
        if (!name || !email || !textarea) {
            alert("Please fill in all fields.");
            return;
        }

        alert("Form submitted successfully!");

        setAuth({
            email: "",
            textarea: "",
            name: "",
        });
    };



    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.23, 1, 0.32, 1],
            },
        },
    };

    const heroVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2,
                staggerChildren: 0.3,
            },
        },
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 md:p-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <section className="w-full text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    About Us
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Dedicated to providing exceptional products with a focus on
                    quality, design, and customer experience.
                </p>
            </section>

            {/* Hero Image */}
            <section className="w-full mb-12">
                <img
                    className="rounded-2xl w-full h-auto max-h-[500px] object-cover"
                    src="https://img.freepik.com/free-photo/minimalist-black-friday-composition-black-background_23-2148666983.jpg"
                    alt="LUXE store interior"
                    loading="lazy"
                />
            </section>

            {/* Mission & Vision */}
            <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroVariants}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        At LUXE, we believe in providing our customers with
                        products that combine aesthetics, functionality, and
                        sustainability. Our mission is to curate collections
                        that inspire and enhance everyday living while
                        maintaining the highest standards of quality and ethical
                        sourcing.
                    </p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                        Our Vision
                    </h2>
                    <p className="text-gray-600 text-sm md:text-base">
                        We envision a world where thoughtful design and
                        responsible consumption go hand in hand. Our goal is to
                        be at the forefront of modern retail, setting trends
                        rather than following them, and creating a shopping
                        experience that resonates with our customers' values and
                        aspirations.
                    </p>
                </motion.div>
            </section>

            {/* Values Section */}
            <section className="w-full mb-16">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Our Values
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Quality",
                            description:
                                "We never compromise on the quality of our products and services.",
                            icon: "⭐",
                        },
                        {
                            title: "Innovation",
                            description:
                                "We continuously seek new ideas and approaches to improve our offerings.",
                            icon: "💡",
                        },
                        {
                            title: "Sustainability",
                            description:
                                "We are committed to minimizing our environmental footprint.",
                            icon: "🌱",
                        },
                        {
                            title: "Community",
                            description:
                                "We value the relationships we build with our customers and partners.",
                            icon: "🤝",
                        },
                    ].map((value, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
                        >
                            <div className="text-3xl mb-3">{value.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">
                                {value.title}
                            </h3>
                            <p className="text-gray-600 text-sm md:text-base">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section className="w-full bg-gray-50 rounded-xl p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Get in Touch
                    </h2>
                    <p className="text-gray-600 text-center mb-8 text-lg">
                        We'd love to hear from you! If you have any questions,
                        feedback, or inquiries, please don't hesitate to contact
                        us.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="text-center">
                            <div className="text-xl font-semibold mb-2">
                                Email
                            </div>
                            <a
                                href="mailto:info@luxe-store.com"
                                className="text-blue-600 hover:underline"
                            >
                                info@luxe-store.com
                            </a>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-semibold mb-2">
                                Phone
                            </div>
                            <a
                                href="tel:+15551234567"
                                className="text-blue-600 hover:underline"
                            >
                                +1 (555) 123-4567
                            </a>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-semibold mb-2">
                                Address
                            </div>
                            <address className="not-italic">
                                123 Fashion Street
                                <br />
                                New York, NY 10001
                            </address>
                        </div>
                    </div>

                    <form
                        onSubmit={handelForm}
                        className="max-w-lg mx-auto space-y-4"
                    >
                        <div>
                            <label htmlFor="name" className="block mb-1">
                                Name
                            </label>
                            <input
                                value={auth.name}
                                onChange={handelChange}
                                name="name"
                                type="text"
                                id="name"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1">
                                Email
                            </label>
                            <input
                                value={auth.email}
                                onChange={handelChange}
                                name="email"
                                type="email"
                                id="email"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block mb-1">
                                Message
                            </label>
                            <textarea
                                onChange={handelChange}
                                value={auth.textarea}
                                name="textarea"
                                id="message"
                                rows="4"
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default About;
