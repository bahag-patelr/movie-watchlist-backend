import { Router } from "express";
import {
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
  getUserWatchlist,
  updateWatchlistItem,
} from "../controllers/watchlistsController.js";

const watchlistsRoutes = Router();

watchlistsRoutes.post("/movies/add-to-watchlist", addMovieToWatchlist);
watchlistsRoutes.get("/movies/:id", getUserWatchlist);
watchlistsRoutes.delete("/movies/:id", deleteMovieFromWatchlist);
watchlistsRoutes.patch("/movies/:id", updateWatchlistItem);

export default watchlistsRoutes;
