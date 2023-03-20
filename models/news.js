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
      required: true,
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
    tags: [String],
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: Object,
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", NewsSchema);
