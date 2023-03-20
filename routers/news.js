const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
} = require("../controllers/news");
const multer = require("../middleware/multer");

// create news
router.post("/", multer.single("thumbnail"), createNews);

// get all news
router.get("/", getAllNews);

// get single news
router.get("/:id", getSingleNews);

module.exports = router;
