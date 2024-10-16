import { Outlet } from "react-router-dom";
import Navbar from "../components/navbars/Navbar";



export const HomeLayout = () => {
    return (
        <div className="min-h-screen rounded-lg bg-slate-800">
            <nav>
                <Navbar />
            </nav>
            <div id="home">
                <Outlet />
            </div>
        </div>
    )
}