import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";


export const AdminLayout = () => {
    return (
        <div className="min-h-screen rounded-lg bg-slate-800 py-4 border-2 border-red-700 sm:w-full sm:h-full w-fit h-fit">
            <nav>
                <AdminNavbar />
            </nav>
            <Outlet />
        </div>
    )
}