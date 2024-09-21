import { Link } from "react-router-dom";




export default function UserNavbar() {


    return (
        <div>
            <Link to={"/user/profile"}>
                <button>
                    profile
              </button>
            </Link>
            <Link to={"/user/Home"}>
                <button>
                    Home
              </button>
            </Link>
        </div>
    )
}