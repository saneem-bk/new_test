import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const UserHome = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/movie/featured');
        if (response) {
          setFeaturedMovies(response.data);
        }
      } catch (error) {
        console.log(error);
        setFeaturedMovies([]);
      }
    };
    fetchFeaturedMovies();
  }, []);

  const handleGenreClick = (genre) => {
    navigate(`/user/movies/genre/${genre}`);
  };

  return (
    <div>
      {featuredMovies.length > 0 && (
      <>
      <section >
        <div className="pl-2 pt-2 grid grid-cols-2 gap-4 w-full">
          <button onClick={() => handleGenreClick('Action')} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 font-medium rounded-lg text-sm py-2 px-5 text-center me-2 mb-2'>Action</button>
          <button onClick={() => handleGenreClick('Adventure')} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 font-medium rounded-lg text-sm py-2 px-5 text-center me-2 mb-2'>Adventure</button>
          <button onClick={() => handleGenreClick('Comedy')} className='text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 font-medium rounded-lg text-sm py-2 px-5 text-center me-2 mb-2'>Comedy</button>
          <button onClick={() => handleGenreClick('Romance')} className='text-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 font-medium rounded-lg text-sm py-2 px-5 text-center me-2 mb-2'>Romance</button>
        </div>
      </section>


      <section className='border-t border-t-red-600 pb-10 py-5 mt-10'>
        <h1 className='text-red-600 text-3xl mb-5 font-bold leading-8'>FEATURED MOVIES</h1>
        <div className="flex flex-wrap border border-red-600 mx-10 py-10 justify-evenly gap-20">
          {featuredMovies.map((movie) => (
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
     
      <footer className='flex flex-wrap gap-2 justify-evenly md:flex-row bg-red-600 font-bold text-sm text-slate-800 py-5 mt-10'>
        <label htmlFor="about us" className=''>ABOUT US</label>
        <label htmlFor="contact us" className=''>CONTACT US</label>
        <label htmlFor="terms" className=''>TERMS & CONDITIONS</label>
        <label htmlFor="privacy policy" className=''>PRIVACY POLICY</label>
        <label htmlFor="social media" className=''>SOCIAL MEDIA</label>
      </footer>
        </>
      )}  
    </div>
  );
};

export default UserHome;