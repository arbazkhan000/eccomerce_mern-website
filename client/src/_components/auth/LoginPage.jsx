import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    // input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuth((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formdata = new FormData();
        formdata.append("email", auth.email);
        formdata.append("password", auth.password);

        try {
            const { data } = await axiosInstance.post("/users/login", formdata);
            console.log("Login response data:", data);
            const { token, data: user } = data;
            console.log("User data:", user);

            // Check if user data is present
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("token", token);

                // ✅ Fixed: Check user.role instead of user.isAdmin
                const isAdmin = user.role === "admin";
                localStorage.setItem("admin", isAdmin ? "true" : "false");

                toast({
                    title: "Login Successful",
                    description: "You have successfully logged in.",
                });

                // Redirect based on role
                if (isAdmin) {
                    navigate("/admin");
                } else {
                    navigate("/products");
                }
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="border p-5 w-[400px] shadow-lg rounded-lg bg-white"
            >
                <h1 className="text-2xl font-bold text-center pb-5">
                    Welcome to Luxe
                </h1>

                <div className="grid w-full max-w-sm items-center gap-2 my-3">
                    <Label className="text-sm" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        name="email"
                        value={auth.email}
                        onChange={handleChange}
                        type="email"
                        id="email"
                        placeholder="Enter your email address..."
                        required
                    />
                </div>

                <div className="grid w-full max-w-sm items-center gap-2 my-3">
                    <Label className="text-sm" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        name="password"
                        value={auth.password}
                        onChange={handleChange}
                        type="password"
                        id="password"
                        placeholder="Enter your password..."
                        required
                        minLength={6}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm my-2">{error}</div>
                )}

                <div className="mt-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                </div>

                <div className="my-3 text-center">
                    <p className="text-[15px] text-gray-600">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
