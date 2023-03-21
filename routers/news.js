const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
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

// get single news
router.get("/:id", getSingleNews);

// update news
router.patch("/:id", updateNews);

// delete news
router.delete("/:id", deleteNews);

module.exports = router;
