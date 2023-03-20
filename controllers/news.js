const News = require("../models/news");

// create news
const createNews = async (req, res) => {
  try {
    // check if news is featured
    const featured = JSON.parse(req.body.featured);
    if (featured) {
      const featuredNews = await News.find({ featured: true });

      // remove one featured news if featured news greater than 4
      if (featuredNews.length > 4) {
        await News.deleteOne({ featured: true });
      }
    }

    const news = await News.create({ ...req.body });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single news
const getSingleNews = async (req, res) => {};

module.exports = { createNews, getAllNews, getSingleNews };
