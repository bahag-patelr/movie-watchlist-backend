import { Router } from "express";
import { addCommentAndRating } from "../controllers/commentsController.js";

const router = Router();

router.post("/comments", addCommentAndRating);

export default router;
