import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/navbars/AdminNavbar";


export const AdminLayout = () => {
    return (
        <div>
            <nav>
                <AdminNavbar />
            </nav>
            <Outlet />
        </div>
    )
}