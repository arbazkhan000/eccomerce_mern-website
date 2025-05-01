import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useState({
        fullName: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    // handle change for inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const fromdata = new FormData();

        fromdata.append("fullName", auth.fullName);
        fromdata.append("email", auth.email);
        fromdata.append("password", auth.password);

        console.log("Form Submitted:", auth);

        try {
            const { data } = await axiosInstance.post(
                "/users/register",
                fromdata
            );

            console.log("Response:", data);
            if (data.status === "success") {
                toast({
                    title: "Registration Successful",
                    description: "You have successfully registered.",
                });
            }
            setAuth({
                fullName: "",
                email: "",
                password: "",
            });

            // Redirect to login page after successful registration
            navigate("/login");
        } catch (error) {
            console.error("Error:", error);
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }

        // TODO: Add API call here
    };

    return (
        <div className="h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="border p-5 w-[400px] shadow-lg rounded-lg"
            >
                <h1 className="text-2xl font-bold text-center pb-1">
                    Welcome to Luxe
                </h1>

                <div className="grid w-full max-w-sm items-center my-3 gap-2">
                    <Label className="text-sm" htmlFor="fullName">
                        Full Name
                    </Label>
                    <Input
                        onChange={handleChange}
                        value={auth.fullName}
                        name="fullName"
                        type="text"
                        id="fullName"
                        placeholder="Enter your full name..."
                    />
                </div>

                <div className="grid w-full max-w-sm items-center my-3 gap-2">
                    <Label className="text-sm" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        onChange={handleChange}
                        value={auth.email}
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Enter your email address..."
                    />
                </div>

                <div className="grid w-full max-w-sm items-center my-3 gap-2">
                    <Label className="text-sm" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        onChange={handleChange}
                        value={auth.password}
                        name="password"
                        type="password"
                        id="password"
                        placeholder="Enter your password..."
                    />
                </div>

                <Button className="w-full mt-2" type="submit">
                    Register
                </Button>

                <div className="my-3 text-center">
                    <p className="text-[15px]">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 underline">
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterPage;
