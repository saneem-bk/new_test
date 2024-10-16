import mongoose from 'mongoose';
import Movie from '../models/movieModel.js';
import Review from '../models/reviewModel.js';
import { handleImageUpload }  from '../utils/imageUpload.js';

export const createMovie = async (req, res, next) => {
    
    try {
        const { title, description, genre,releaseDate ,director,cast} = req.body;
        let imageUrl;

        if (!title || !description || !genre || !releaseDate || !director || !cast) {
            return res.status(400).json({ message: "all fields required" });
        }
        
        const isMovieExist = await Movie.findOne({ title });
       
        if (isMovieExist) {
            return res.status(409).json({ success: false, message: "movie already exist" });
        }
      

        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        }

      const newMovie = new Movie({
        title,
        description,
        releaseDate,
        genre,
        director,
        cast,
        image: imageUrl ? imageUrl : undefined
      });
        
        await newMovie.save();

        res.status(201).json({ success: true, message: "movie created successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;

        const { title, description, releaseDate, genre,director,cast, imageUrl : newImageUrl } = req.body;
        let imageUrl;

        const isMovieExist = await Movie.findOne({ _id: movieId });

        if (!isMovieExist) {
            return res.status(400).json({ success: false, message: "movie does not exist" });
        }

        if (req.file) {
            imageUrl = await handleImageUpload(req.file.path);
        } else if (newImageUrl) {
          imageUrl = newImageUrl;
        } else {
          imageUrl = isMovieExist.image
        }
        
        const updatedMovie = await Movie.findOneAndUpdate(
            { _id: movieId },
            { title, description, releaseDate, genre, director,cast,image: imageUrl},
            { new: true }
        );

        res.status(200).json({ success: true, message: "movie updated successfully", data: updatedMovie });
    } catch (error) {
        next(error);
    }
};

export const deleteMovie = async (req, res, next) => {
    try {
      const { id } = req.params;
      

        const movieDeleted = await Movie.findByIdAndDelete({ _id: id });

        if (!movieDeleted) res.status(400).json({ success: true, message: "movie already deleted" });

        res.status(200).json({ success: true, message: "movie deleted successfully", data: movieDeleted });
    } catch (error) {
        next(error);
    }
};


export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "movieId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: { $ifNull: ["$reviews.rating", 0] } },
        },
      },
    ]);
    res.status(200).json({ success: true, message: "movies fetched", data: movies });
  } catch (error) {
    next(error);
  }
};


export const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieDetails = await Movie.findById(id)
    

    if (!movieDetails) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    const result = await Review.aggregate([
      { $match: { movieId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          averageRating: {$avg: "$rating"}
        }
      }
    ])

    if (result.length > 0) {
      const { averageRating } = result[0];
      return res.status(200).json({
        success: true,
        message: "movie details fetched",
        data: { movieDetails, averageRating }
      })
    }
   
    res.status(200).json({
      data: {
        movieDetails,
        averageRating: 0
      }
    });
  } catch (error) {
    next(error);
  }
};



export const Featured = async (req, res, next) => {
    try {
        const movies = await Movie.aggregate([
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movieId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              averageRating: { $avg: '$reviews.rating' }
            }
          },
          {
            $sort: { averageRating: -1 } 
          },
          {
            $limit: 6 
          }
        ]);
    
        res.json(movies);
      } catch (error) {
        next(error);
    }
};



export const genreList = async (req, res, next) => {

    const genre = req.query.genre;

    try {
        const genreMovies = await Movie.aggregate([
          {
            $match: {
              genre: { $regex: genre, $options: 'i' }
            }
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'movieId',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              averageRating: { $avg: '$reviews.rating' }
            }
          },
          {
            $sort: { averageRating: -1 } 
          }
        ]);
    
        res.json(genreMovies);
      
      } catch (error) {
        next(error);
    }
};

export const search = async (req, res, next) => {
const query = req.query.query;
  try {
    const movies = await Movie.find({ title: { $regex: query, $options: 'i' } }).select('_id');
    if (movies.length > 0 ) {
     return res.json(movies);
    }

    return res.json({ data: { _id: "not found" } });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
    next(error);
  }
};