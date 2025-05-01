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

    const handelLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/login");

        toast({
            title: "Logout Successful",
            description: "You have successfully logged out.",
        });
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={handelLogout}>
                        Logout
                    </DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LogOutToogle;
