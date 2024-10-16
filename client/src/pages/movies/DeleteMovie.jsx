import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";


export default function DeleteMovie() {

  
   const navigate = useNavigate();
  const { id } = useParams();
  

   const handleDeleteMovie = () => {
    axios
      .delete(`http://localhost:3000/api/v1/movie/delete/${id}`)
      .then(() => {
          alert("Movie deleted successfully !");
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 1000);
      })
      .catch((error) => {
        alert("An error occured. please check the console")
        console.log(error);
      });
  };
  
  const handleCancel = () => {
    navigate("/admin/dashboard", { replace: true });
  }

  return (
      
    <main className='max-w-4xl mx-auto p-4 md:p-6 lg:p-8'>
       <div className="pl-5 pt-2">
        <div className="p-4 md:p-6">
          <h1 className="flex justify-center text-3xl my-4">Delete Movie</h1>
          <div className="flex flex-col items-center border-2 border-sky-000 rounded-xl w-full md:w-3/4 lg:w-2/3 p-4 mx-auto">
            <h3 className="text-2xl text-white">Are you sure, you want to delete this movie ?</h3>
            <button
              className="p-4 bg-red-600 text-white m-8 w-full md:w-2/3 lg:w-1/2"
              onClick={handleDeleteMovie}
            >
              delete it
            </button>
            <button
              className="p-4 bg-green-300 text-white m-8 w-full md:w-2/3 lg:w-1/2"
              onClick={handleCancel}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </main>
      
   );
}

