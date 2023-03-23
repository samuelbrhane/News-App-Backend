const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getFeaturedNews,
  searchNews,
  uploadImage,
} = require("../controllers/news");
const multer = require("../middleware/multer");
const { newsValidator, validate } = require("../middleware/newsValidator");

// create news
router.post(
  "/",
  multer.single("thumbnail"),
  newsValidator,
  validate,
  createNews
);

// get all news,
router.get("/", getAllNews);

// get featured news
router.get("/featured", getFeaturedNews);

// search news
router.get("/search/news", searchNews);

// get single news
router.get("/:slug", getSingleNews);

// update news
router.patch("/:id", updateNews);

// delete news
router.delete("/:id", deleteNews);

// upload image
router.post("/upload/image", multer.single("image"), uploadImage);

module.exports = router;
