import express from "express";
import { userAuth } from "../../middlewares/userAuth.js";
import { getMovieReviews, addReview, getUserReviews, deleteReview } from "../../controllers/reviewController.js";

const router = express.Router();


router.get("/movie-review/:id", getMovieReviews);
router.post("/add-review", userAuth, addReview);
router.get("/user-reviews", userAuth, getUserReviews);
router.put("/delete/:reviewId", userAuth, deleteReview);

export { router as reviewRouter };
