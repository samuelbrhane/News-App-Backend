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
  const { slug, featured } = req.body;

  try {
    // check if the slug is exist
    const slugExists = await News.findOne({ slug });
    if (slugExists)
      return res
        .status(401)
        .json({ error: "Please change the slug to make it unique" });

    // check if news is featured
    if (featured) {
      const parseFeatured = JSON.parse(featured);
      if (parseFeatured) {
        const featuredNews = await News.find({ featured: true });

        // remove one featured news if featured news greater than 4
        if (featuredNews.length > 4) {
          await News.deleteOne({ featured: true });
        }
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
  const { pageNo = 0, limit = 9 } = req.query;
  try {
    const news = await News.find()
      .sort({ createdAt: -1 })
      .skip(parseInt(pageNo) * parseInt(limit))
      .limit(parseInt(limit));
    const count = await News.countDocuments();
    res.status(200).json({ news, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get single news
const getSingleNews = async (req, res) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({ slug });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update news
const updateNews = async (req, res) => {
  const { file } = req;
  const { slug, featured } = req.body;
  try {
    // check if the slug is exist
    if (slug) {
      const slugExists = await News.findOne({ slug });
      if (slugExists)
        return res
          .status(401)
          .json({ error: "Please change the slug to make it unique" });
    }

    // check if news is featured
    if (featured) {
      const parseFeatured = JSON.parse(featured);
      if (parseFeatured) {
        const featuredNews = await News.find({ featured: true });

        // remove one featured news if featured news greater than 4
        if (featuredNews.length > 4) {
          await News.deleteOne({ featured: true });
        }
      }
    }

    if (file) {
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path
      );
      req.body.thumbnail = { public_id, secure_url };
    }

    const news = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete news
const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findById(id);
    if (!news) return res.status(401).json({ error: "No news with this id." });

    // remove image from cloudinary
    const { public_id } = news.thumbnail;
    if (public_id) {
      await cloudinary.uploader.destroy(public_id);
    }

    // remove news form the database
    const deletedNews = await News.findByIdAndDelete(id);
    res.status(200).json(deletedNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get featured news
const getFeaturedNews = async (req, res) => {
  try {
    const news = await News.find({ featured: true }).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get search news by title
const searchNews = async (req, res) => {
  const { title } = req.query;
  if (!title?.trim())
    return res.status(401).json({ error: "No News With This Title" });
  try {
    const news = await News.find({
      title: { $regex: new RegExp(title, "i") },
    }).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// upload image
const uploadImage = async (req, res) => {
  const { file } = req;
  if (!file) return res.status(404).json({ error: "Image file is missing" });
  const { secure_url } = await cloudinary.uploader.upload(file?.path);
  res.status(200).json({ secure_url });
};

module.exports = {
  createNews,
  getAllNews,
  getSingleNews,
  updateNews,
  deleteNews,
  getFeaturedNews,
  searchNews,
  uploadImage,
};
