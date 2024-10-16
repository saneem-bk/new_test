import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

export default function AdminShowMovies() {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    
    axios
      .get("http://localhost:3000/api/v1/movie/movie-list")
      .then((response) => {
        if (response.data) {
          
          setMovies(response.data.data);
        } else {
          setMovies([]);
        }
       
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    
  
      
      
  
    return (
        <div>
        
            {movies.length === 0 ? (
                <p>No movies found</p>
            ) : (
                        
                <section className='border-t border-t-red-600 pb-10 py-5 mt-10'>
                    <h1 className='text-red-600 text-3xl mb-5 font-bold leading-8'>Movies</h1>
                    <div className="flex flex-wrap border border-red-600 mx-10 py-10 justify-evenly gap-20">
                
                        {movies.map((movie) => (
                            <div key={movie._id} className='border border-red-600 bg-gray-600 rounded-md pt-2 lg:px-20'>
                                <Link to={`/admin/movies/${movie._id}`}>
                                    <div className="movie-card border border-red-700 w-48 h-64">
                 
                                        <img src={movie.image} alt={movie.title} className='w-full h-full object-cover rounded-md' />
               
                                    </div>
                                    <div className="px-4 py-2">
                                        <h2 className='text-lg text-white'>{movie.title}</h2>
                                        <p className='text-lg text-white'>{movie.averageRating ? movie.averageRating.toFixed(1) : 'No Ratings Yet'}</p>
                                    </div>
              
                                </Link>
                                <div className="flex justify-center gap-x-20">
                                    <Link to={`/admin/movies/edit/${movie._id}`}>
                                        <AiOutlineEdit className="text-xl w-6 h-6 text-cyan-700" />
                                    </Link>
                                    <Link to={`/admin/movies/delete/${movie._id}`}>
                                        <MdOutlineDelete className="text-xl w-6 h-6 text-red-900" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
     </div>
    );
  };