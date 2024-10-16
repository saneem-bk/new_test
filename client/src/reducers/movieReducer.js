import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    error: null,
    movieId: null,
  },
  reducers: {
    searchMoviesSuccess: (state, action) => {
      state.searchResults = [];
      state.movieId = action.payload;
    },
    clearMovieData: (state) => {
    
      state.searchResults = [];
      state.error = null;
      state.movieId = null;
     
    },
    searchMoviesFail: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
     
    },
  },
});

export const { searchMoviesSuccess, searchMoviesFail, clearMovieData, clearError } = movieSlice.actions;
export default movieSlice.reducer;
