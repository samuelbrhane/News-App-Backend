const mongoose = require("mongoose");

const NewsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    meta: {
      type: String,
      trim: true,
    },
    authorMedia: {
      type: String,
      required: true,
    },
    writer: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    thumbnail: {
      type: Object,
      secure_url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
