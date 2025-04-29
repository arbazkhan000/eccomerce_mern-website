import {
    Calendar,
    ChartBar,
    FilePlus2Icon,
    GalleryVerticalEnd,
    PackageSearch,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";

// Menu items.
const items = [
    {
        title: "Create Products",
        url: "/admin/deshboard",
        icon: FilePlus2Icon,
    },
    {
        title: "All Products",
        url: "/admin/deshboard/all-products",
        icon: GalleryVerticalEnd,
    },
    {
        title: "Orders",
        url: "/admin/deshboard/orders",
        icon: PackageSearch,
    },
    {
        title: "Analytics",
        url: "/admin/deshboard/analytics",
        icon: ChartBar,
    },
    {
        title: "Settings",
        url: "/admin/deshboard/setting",
        icon: Settings,
    },
];

const AdminSidebar = () => {
  
    return (
        <Sidebar className="min-h-screen bg-white border-r shadow-md w-64 md:w-60 ">
            <SidebarHeader className="px-4 py-3 border-b">
                <h2 className="text-xl font-bold">Dashboard</h2>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            to={item.url}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 ${
                                                    isActive
                                                        ? "bg-gray-200"
                                                        : ""
                                                }`
                                            }
                                        >
                                            <item.icon className="w-5 h-5 text-gray-600" />
                                            <span className="text-sm font-medium">
                                                {item.title}
                                            </span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AdminSidebar;
