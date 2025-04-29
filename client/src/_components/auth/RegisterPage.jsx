import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const RegisterPage = () => {
    return (
        <div>
            {" "}
            <div className="h-screen flex items-center justify-center">
                <form className="border  p-5 w-[400px] shadow-lg rounded-lg" action="">
                    <h1 className="text-2xl font-bold text-center pb-1">
                        Welcome to Ebay Store
                    </h1>

                    <div className="grid w-full max-w-sm items-center my3 gap-2 ">
                        <Label className="text-sm" htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="text"
                            placeholder="Enter your username..."
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center my-3 gap-2">
                        <Label className="text-sm" htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email address..."
                        />
                    </div>

                    {/* password */}
                    <div className="grid w-full max-w-sm items-center my-3 gap-2 ">
                        <Label className="text-sm" htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Enter your password..."
                        />
                    </div>

                    <div className="">
                        <Button className="w-full">Register</Button>
                    </div>
                    <div className="my-3">
                        <p className="text-[15px]">
                            I have allready account? <a href="#">Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
