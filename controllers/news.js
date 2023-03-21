const News = require("../models/news");
const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dat2kqoex",
  api_key: "391699287616776",
  api_secret: "5iY5fVEC5_KxQDC2DDu07-5n6rY",
});

// create news
const createNews = async (req, res) => {
  const { file } = req;

  try {
    // check if the slug is exist
    const slugExists = await News.findOne({ slug: req.body.slug });
    if (slugExists)
      return res
        .status(401)
        .json({ error: "Please change the slug to make it unique" });

    // check if news is featured
    const featured = JSON.parse(req.body.featured);
    if (featured) {
      const featuredNews = await News.find({ featured: true });

      // remove one featured news if featured news greater than 4
      if (featuredNews.length > 4) {
        await News.deleteOne({ featured: true });
      }
    }

    if (file) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path
      );
      req.body.thumbnail = { public_id, secure_url };
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
