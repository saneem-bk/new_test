import UserList from "./UserList"
import AdminShowMovies from "./AdminShowMovies";
import { Link } from "react-router-dom";

export default function AdminDashboard() {


  return (

    <div className="border-2 border-red-600 mx-2">
       <h3 className="text-5xl font-bold text-red-600 underline pt-5">ADMIN DASHBOARD</h3>
      <section className="my-5">
        <Link to={"/admin/add-movie"}>
         <button className="bg-red-500 font-bold mt-5 px-5 py-2 rounded-lg">
          Add Movie
         </button>
        </Link>
      </section>
      <section>
        <AdminShowMovies />
      </section>
      <section>
       <h4 className="text-red-600 w-full bg-yellow-50 text-3xl">USER LIST</h4>
        <UserList />
      </section>
    </div>
  )
}

