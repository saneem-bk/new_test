import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
    {
        title: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        releaseDate: { 
            type: Date, 
            required: true 
        },
        genre: { 
            type: String, 
            required: true 
        },
        director: { 
            type: String, 
            required: true 
        },
        cast: [
            {
              name: String,
              role: String,
            }
          ],
        averageRating: { 
            type: Number, 
            default: 0 
        },
        image: String,
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    }, 
    { timestamps: true }
    );

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
