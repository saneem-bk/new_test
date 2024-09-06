import express from "express";
import upload from "../../middlewares/multer.js";
import adminAuth from "../../middlewares/adminAuth.js";
import { createMovie, updateMovie, deleteMovie, getMovies, getMovieDetails} from "../../controllers/movieController.js";


const router = express.Router();

router.get("/movie-list", getMovies);
router.get("/details/:movieId", getMovieDetails);
router.post("/create", upload.single("image"), createMovie);
router.put("/update/:movieId", upload.single("image"), updateMovie);
router.delete("/delete/:movieId", adminAuth, deleteMovie);

export {router as movieRouter };