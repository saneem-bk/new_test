import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";





export default function UserNavbar() {


    return (
        
        <div className="flex flex-wrap justify-center pt-5 pb-3 rounded-t-lg border border-red-600 gap-12">
            <div className="rounded-full bg-white p-2 font-bold mr-5 ml-5">
                <h6>Logo</h6>
            </div>
            <Link to={"/user/Home"}>
              <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-1 px-5 text-center me-2 mb-2">
                    Home
              </button>
            </Link>
        <Link to={"/user/movies/movie-list"}>
               <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-1 px-5 text-center me-2 mb-2">
                    Movies
               </button>
            </Link>
            <Link to={"/user/profile"}>
                <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-1 px-5 text-center me-2 mb-2">
                    profile
              </button>
            </Link>
            <Link to={"/user/logout"}>
              <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm py-1 px-5 text-center me-2 mb-2">
                    Logout
              </button>
            </Link>   
              <SearchBar />
         </div>  
       
    )
}