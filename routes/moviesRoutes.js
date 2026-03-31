import { Router } from "express";
import { searchMovies } from "../controllers/moviesController.js";

const moviesRoutes = Router();

moviesRoutes.get("/movies/search", searchMovies);

export default moviesRoutes;