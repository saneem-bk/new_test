import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { getAverageRating, getMovieReviews, addReview, deleteReview } from "../../controllers/reviewController.js";

const router = express.Router();

router.get("/avg-rating/:movieId", userAuth, getAverageRating);
router.get("/movie-review/:movieId", userAuth, getMovieReviews);
router.post("/add-review", userAuth, addReview);
router.put("/delete/:reviewId", userAuth, deleteReview);

export { router as reviewRouter  };