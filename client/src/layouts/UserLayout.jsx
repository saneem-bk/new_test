import { Outlet } from "react-router-dom";
import UserNavbar from "../components/navbars/UserNavbar";


export const UserLayout = () => {
    return (
        <div>
            <nav>
                <UserNavbar />
            </nav>
            <Outlet />
        </div>
    )
}