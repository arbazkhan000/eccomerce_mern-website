import CheckOutProduct from "@/_components/CheckOutProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckOutPage = () => {
    return (
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center py-10 px-4 md:px-8 lg:px-16 gap-8">
            {/* Order Summary Section */}
            <div className="w-full lg:w-1/2 border px-5 py-6 rounded-lg shadow-md bg-white">
                <h3 className="text-xl md:text-2xl font-medium py-3 text-center lg:text-left">
                    Order Summary
                </h3>
                <hr className="my-4" />

                {/* Checkout Product */}
                <div>
                    <CheckOutProduct />
                </div>
                <hr className="my-4" />

                {/* Pricing Details */}
                <div className="flex flex-col gap-4 text-sm md:text-base">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-semibold">₹588</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tax:</span>
                        <span className="font-semibold">₹0</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span className="font-semibold">₹0</span>
                    </div>
                </div>
                <hr className="my-4" />

                {/* Total */}
                <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold">₹588</span>
                </div>
            </div>

            {/* Billing Information Section */}
            <div className="w-full lg:w-1/2 border px-5 py-6 rounded-lg shadow-md bg-white">
                <h2 className="text-xl md:text-2xl font-medium py-3 text-center lg:text-left">
                    Billing Information
                </h2>
                <form className="flex flex-col gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Full Name">Full Name</Label>
                        <Input id="Full Name" placeholder="John Doe" />
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Email Address">Email Address</Label>
                        <Input id="Email Address" placeholder="exp@gmail.com" />
                    </div>

                    {/* Billing Address */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="Billing Address">Billing Address</Label>
                        <textarea
                            id="Billing Address"
                            placeholder="123 Main City, Hapur"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none text-sm resize-none"
                        ></textarea>
                    </div>

                    {/* Place Order Button */}
                    <Button className="w-full">Place Order</Button>
                </form>
            </div>
        </div>
    );
};

export default CheckOutPage;
