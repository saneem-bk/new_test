import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Reviews from "../shared/ShowReviews";

export default function AdminMoviePage() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/movie/details/${id}`)
        setMovie(response.data.data.movieDetails); 
        setAverageRating(response.data.data.averageRating);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details");
       
      }
    };

    fetchMovieDetails();
  }, [id]); 

  if (error) {
    return <p>{error}</p>;
  }

  const releaseDate = movie ? movie.releaseDate.split("T")[0] : "";
  console.log(movie)
  return (
    <div>
      {movie ? (
        <div className="text-white">
         <div className="flex flex-wrap my-8">
          <div className="flex w-full md:w-1/3 lg:w-1/2 items-center justify-center border-2 bg-sky-900 border-red-600 lg:ml-5">
            <div className="lg:text-start px-2 lg:px-20">
             <p>Movie Title : { movie.title }</p>
             <p>Director : {movie.director}</p>
             <p>Release Date : {releaseDate} </p>
             <p>Genre : {movie.genre}</p>
             <div>
                <p>Cast -</p>
                 {movie.cast.map((actor, index) => (
               <div className="pl-5" key={index}>
                 <h2>Name : {actor.name}</h2>
                 <p>Role : {actor.role} ,</p>
               </div>
               ))}
             </div>
             <p>Average Rating : {averageRating ? averageRating.toFixed(1) : 'No Ratings Yet'}</p>
            </div>
          </div>
            <section className="flex w-full md:w-1/3 lg:w-1/2 flex-1 border-2 bg-orange-900 border-red-600 justify-center lg:mr-5">
              <div className="border-2 border-red-600">
                <img src={movie.image} alt={movie.title} />
              </div>
            </section> 
          </div>
          <section className="mt-20 text-xl">
           <h2 className="font-bold border-y border-y-red-600 my-4 py-4 bg-red-500">Summary</h2>
           <p>{movie.description}</p>
          </section>
          <section className="mt-20 text-xl">
              <h2 className="font-bold border-y border-y-red-600 my-4 py-4 bg-red-500">Reviews</h2>
              <Reviews />
          </section>
          
        </div>
      ) : (
        <p>No movie details found</p>
      )}
    </div>
  );
}