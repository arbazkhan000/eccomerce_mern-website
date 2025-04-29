import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { ShoppingCart } from "lucide-react";

const CartDrawer = () => {
    const cartItems = [
        { id: 1, name: "Item 1", price: 100, quantity: 2 },
        { id: 2, name: "Item 2", price: 150, quantity: 3 },
    ];

    // Calculate total quantity
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="relative">
            <Drawer>
                <DrawerTrigger className="relative flex items-center">
                    {totalQuantity > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1 py-0.5 text-xs bg-red-500">
                            {totalQuantity}
                        </Badge>
                    )}
                    <ShoppingCart size={28} />
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Cart Details</DrawerTitle>
                        <DrawerDescription>
                            Total Items: {totalQuantity}
                        </DrawerDescription>
                    </DrawerHeader>

                    {/* Cart Items */}
                    <div className="px-4 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-semibold">
                                    {item.price * item.quantity} rs
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Subtotal */}
                    <div className="px-4 py-4 flex justify-between font-bold text-lg">
                        <span>Subtotal</span>
                        <span>{subtotal} rs</span>
                    </div>

                    <DrawerFooter>
                        <Button>Checkout</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default CartDrawer;
