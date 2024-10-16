import { Outlet } from "react-router-dom";
import UserNavbar from "../components/navbars/UserNavbar";


export const UserLayout = () => {
    return (
        <div className="min-h-screen rounded-lg bg-slate-800">
            <nav>
                <UserNavbar />
            </nav>
            <Outlet />
        </div>
    )
}