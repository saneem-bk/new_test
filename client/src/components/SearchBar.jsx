import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovies } from '../actions/actions.js';
import { FaSearch } from "react-icons/fa";
import { clearMovieData,clearError } from '../reducers/movieReducer.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { movieId, error } = useSelector((state) => state.search);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(clearError());
      dispatch(searchMovies(query));
    }
  };

  useEffect(() => {
    if (movieId === "not found") {
       alert(movieId);
    } else if (movieId) {

      navigate(`/user/movies/${movieId}`);
      dispatch(clearMovieData());
    } else if (error) {
      alert("No movie found");
    }
  }, [movieId, error, navigate, dispatch]);

  return (
    <div>
      <form onSubmit={handleSearch} className="flex border border-red-800 lg:w-106">
        <input
          type="text"
          placeholder="Search Movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border text-white text-center bg-slate-500 lg:w-80"
        />
        <button type="submit" className=''>
          <FaSearch className="bg-white h-[42px] w-[26px]" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;