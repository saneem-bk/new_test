import { searchMoviesSuccess, searchMoviesFail } from '../reducers/movieReducer.js';
import axios from "axios";

export const searchMovies = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/movie/search?query=${query}`);
    const movieId = response.data[0]._id;
    console.log(movieId)
    dispatch(searchMoviesSuccess(movieId));
  } catch (error) {
    dispatch(searchMoviesFail(error.message));
  }
};