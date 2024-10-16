import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../reducers/movieReducer.js';

const store = configureStore({
  reducer: {
    search: movieReducer
  },
});

export default store;