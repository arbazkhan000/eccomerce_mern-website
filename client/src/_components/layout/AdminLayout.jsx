import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";

const AdminLayout = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
