import { Link } from "react-router-dom";




export default function AdminNavbar() {


    return (
        <div>
            <Link to={"/admin/dashboard"}>
                <button>
                    Dashboard
              </button>
            </Link>
            <Link to={"/admin/home"}>
                <button>
                    Home
                </button>
            </Link>
        </div>
    )
}