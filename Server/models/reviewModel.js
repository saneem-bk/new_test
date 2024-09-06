import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        userId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },
        movieId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Movie', 
            required: true 
        },
        comment: { 
            type: String, 
            required: true 
        },
        rating: { 
            type: Number, 
            required: true, 
            min: 1, 
            max: 10 
        },
            createdAt: {
                type: Date,
                default: Date.now
        }
    }, 
    { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
