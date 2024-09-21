import { Outlet } from "react-router-dom";
import Navbar from "../components/navbars/Navbar";



export const HomeLayout = () => {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <div id="home">
                <Outlet />
            </div>
        </div>
    )
}