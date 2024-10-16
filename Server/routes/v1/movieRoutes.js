import express from "express";
import upload from "../../middlewares/multer.js";
import { createMovie, updateMovie, deleteMovie, getMovies, getMovieDetails, Featured, genreList, search} from "../../controllers/movieController.js";


const router = express.Router();

router.get("/featured", Featured);
router.get("/search", search);
router.get("/genre", genreList);
router.get("/movie-list", getMovies);
router.get("/details/:id", getMovieDetails);
router.post("/create", upload.single("image"), createMovie);
router.put("/update/:movieId", upload.single("image"), updateMovie);
router.delete("/delete/:id", deleteMovie);

export {router as movieRouter };