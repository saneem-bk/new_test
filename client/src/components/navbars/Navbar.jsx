import { Link } from "react-router-dom";




export default function Navbar() {


    return (
        <div>
            <Link to={"/user/signin"}>
                <button>
                    Sign in
              </button>
            </Link>
            <Link to={"/user/signup"}>
                <button>
                    Sign up
              </button>
            </Link>
        </div>
    )
}