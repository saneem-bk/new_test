import Review from '../models/reviewModel.js'

export const addReview = async (req, res) => {
    try {
        const { movieId, rating, comment } = req.body;
        const userId = req.user.id;
        console.log(userId)
        const isReviewExist = await Review.findOne({ movieId, userId });

        if (isReviewExist) {
            return res.status(409).json({ success: false, message: "already rated this movie" });
        }
        const review = new Review({ userId, movieId, rating, comment });
            
        await review.save();

        res.status(201).json({ succes: true,message: "Review was successful", data:review });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getMovieReviews = async (req, res) => {
    try {
      const { id } = req.params;
      const reviews = await Review.find({ movieId: id }).populate("userId", "name").sort({ createdAt: -1 });
      if (reviews.length === 0) {
        return res.status(200).json({ message: "No reviews found for this movie" });
      }
      return res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };


export const getUserReviews = async (req, res) => {
    try {
        const { id } = req.user;
        const reviews = await Review.find({ userId: id }).populate("movieId", "title").sort({ createdAt: -1 });

        if (!reviews.length) {
            return res.status(404).json({ message: "you haven't made any reviews" });
        }
      console.log("reviews",reviews)
       return res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const deleteReview = async (req, res) => {
    try {
        
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

