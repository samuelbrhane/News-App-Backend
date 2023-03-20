const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getSingleNews,
} = require("../controllers/news");

// create news
router.post("/", createNews);

// get all news
router.get("/", getAllNews);

// get single news
router.get("/:id", getSingleNews);

module.exports = router;
