import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const SuccessPage = () => {
    const [count, setCount] = useState(5);
    // const navigate = useNavigate();

     useEffect(() => {
         const timer = setInterval(() => {
             setCount((prevCount) => prevCount - 1);
         }, 1000); // Update count every 1 second

         if (count <= 1) {
             clearInterval(timer); // Clear the interval when count reaches 1
             window.location.href = "/"; // Redirect to homepage
         }

         return () => clearInterval(timer); // Cleanup interval on component unmount
     }, [count]);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-green-600 mb-4">
                    Payment Success
                </h1>
                <p className="text-sm md:text-base text-gray-600 mb-6">
                    Thank you for your purchase! Click the button below to
                    return to the homepage.
                </p>
                <Button
                    onClick={() => (window.location.href = "/")}
                    className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                    Go to Home (Redirecting you in {count} seconds)
                </Button>
            </div>
        </div>
    );
};

export default SuccessPage;
