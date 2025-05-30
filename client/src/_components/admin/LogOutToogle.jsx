import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LogOutToogle = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("admin"); // Also remove admin status on logout

        navigate("/login");

        toast({
            title: "Logout Successful",
            description: "You have successfully logged out.",
        });
    };

    // Function to get first and last letters of username
    const getInitials = (fullname) => {
        if (!fullname) return "U";

        const words = fullname.trim().split(" ").filter(Boolean);

        if (words.length === 1) {
            return words[0][0].toUpperCase(); // Only first name exists
        }

        // Get first letter of first word and first letter of last word
        return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback>
                            {getInitials(
                                JSON.parse(localStorage.getItem("user"))
                                    ?.fullName
                            )}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LogOutToogle;
