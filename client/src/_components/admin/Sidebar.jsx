import { Link } from "react-router-dom";

const Sidebar = () => {
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <div className="w-full md:w-[250px] p-4 border-r   h-screen">
            <ul className="mt-4 space-y-5">
                <li className="hover:shadow hover:bg-gray-200 p-2 rounded">
                    <Link to="/admin">Dashboard</Link>
                </li>
                <li className="hover:shadow hover:bg-gray-200 p-2 rounded">
                    <Link to="/admin/create-products">CreateProduct</Link>
                </li>
            </ul>

            <button
                onClick={logout}
                className="mt-4  p-2 rounded w-full bg-red-200 hover:bg-transparent hover:border  hover:text-red-400"
            >
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
