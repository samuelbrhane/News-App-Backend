const News = require("../models/news");

// create news
const createNews = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("success");
  //   try {
  //     const news = await News.create({ ...req.body });
  //     res.state(200).json(news);
  //   } catch (error) {
  //     res.state(500).json({ error: error.message });
  //   }
};

// get all news
const getAllNews = async (req, res) => {
  res.send("news");
};

// get single news
const getSingleNews = async (req, res) => {};

module.exports = { createNews, getAllNews, getSingleNews };
