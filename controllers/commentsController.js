import Comments from "../models/Comments.js";
import Users from "../models/Users.js";
import Movies from "../models/Movies.js";

export const addCommentAndRating = async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const movieId = parseInt(req.body.movieId, 10);
    const { comment, rating } = req.body;

    if (!(userId) || !(movieId)) {
      return res.status(400).json({
        success: false,
        message: "userId and movieId must be valid integers",
      });
    }

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Comment is required",
      });
    }

    const parsedRating = rating !== undefined ? parseInt(rating, 10) : null;

    if (
      parsedRating !== null &&
      (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 10)
    ) {
      return res.status(400).json({
        success: false,
        message: "Rating must be an integer between 1 and 10",
      });
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const movie = await Movies.findByPk(movieId);
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found",
      });
    }

    const newComment = await Comments.create({
      user_id: userId,
      movie_id: movieId,
      comment: comment.trim(),
      rating: parsedRating,
    });

    return res.status(201).json({
      success: true,
      message: "Comment and rating added successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Add comment error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
