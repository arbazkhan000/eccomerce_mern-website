import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const LoginPage = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <form
                className="border p-5 w-[400px] shadow-lg rounded-lg"
                action=""
            >
                <h1 className="text-2xl font-bold text-center pb-5">
                    Welcome to Ebay Store
                </h1>
                <div className="grid w-full max-w-sm items-center  gap-2 my-3">
                    <Label className="text-sm" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Enter your email address..."
                    />
                </div>

                {/* password */}
                <div className="grid w-full max-w-sm items-center gap-2 my-3">
                    <Label className="text-sm" htmlFor="password">
                        Password
                    </Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Enter your password..."
                    />
                </div>

                <div className="">
                    <Button className="w-full">login</Button>
                </div>
                <div className="my-3">
                    <p className="text-[15px]">
                        Don't have an account? <a href="#">Sign up</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
