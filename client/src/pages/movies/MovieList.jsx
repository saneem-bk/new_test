import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import axios from "axios";

const MovieList = () => {
  const { genre } = useParams(); 
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const response = await axios.get(`http://localhost:3000/api/v1/movie/genre?genre=${genre}`);
     
      setMovies(response.data);
    };

    fetchMoviesByGenre();
  }, [genre]);

  console.log("movies", movies)

  return (
    
      <div className='mt-12'>
        
            {movies.length === 0 ? (
                <p className="font-bold text-white">No movies found for this genre</p>
            ) : (
                        
             <>
              <section className='border-t border-t-red-600 pb-10 py-5 mt-10'>
              <h1 className='text-red-600 text-3xl mb-5 font-bold leading-8'>{genre} Movies</h1> 
              <div className="flex flex-wrap border border-red-600 mx-10 py-10 justify-evenly gap-20">
                
                     {movies.map((movie) => (
                    <div key={movie._id} className='border border-red-600 bg-gray-600 rounded-md pt-2 lg:px-20'>
                      <Link to={`/user/movies/${movie._id}`}>
                       <div className="movie-card border border-red-700 w-48 h-64">
                 
                        <img src={movie.image} alt={movie.title} className='w-full h-full object-cover rounded-md' />
               
                       </div>
                       <div className="px-4 py-2">
                        <h2 className='text-lg text-white'>{movie.title}</h2>
                        <p className='text-lg text-white'>{movie.averageRating ? movie.averageRating.toFixed(1) : 'No Ratings Yet'}</p>
                       </div>
              
                  </Link>
               </div>
              ))}
            </div>
           </section>
           </>
        )}
                
      </div>
    );
  };

export default MovieList;