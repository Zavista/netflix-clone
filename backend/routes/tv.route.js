import express from "express";
import {
  getTrendingTV,
  getTVTrailers,
  getTVDetails,
  getSimilarTVs,
  getTVByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/details", getTVDetails);
router.get("/:id/similar", getSimilarTVs);
router.get("/:category", getTVByCategory);

export default router;
