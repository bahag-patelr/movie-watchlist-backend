import Movies from "../models/Movies.js";
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
export const searchMovies = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Query parameter 'q' is required",
      });
    }

    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        success: false,
        message: "TMDB request failed",
        error: errorText,
      });
    }

    const data = await response.json();

    // Return only the fields your app needs
    const movies = (data.results || []).map((movie) => ({
      tmdb_id: movie.id,
      name: movie.title,
      overall_rating: movie.vote_average
        ? Math.round(movie.vote_average)
        : null,
      release_date: movie.release_date,
      poster_path: movie.poster_path,
      overview: movie.overview,
    }));

    return res.json({
      success: true,
      count: movies.length,
      results: movies,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
