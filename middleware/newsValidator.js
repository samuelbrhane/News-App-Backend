const { check, validationResult } = require("express-validator");

const newsValidator = [
  check("title").trim().not().isEmpty().withMessage("News title is missing."),
  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("News content is missing."),
  check("meta").trim().not().isEmpty().withMessage("News meta is missing."),
  check("authorMedia")
    .trim()
    .not()
    .isEmpty()
    .withMessage("News authorMedia is missing."),
  check("writer").trim().not().isEmpty().withMessage("News writer is missing."),
  check("slug").trim().not().isEmpty().withMessage("News slug is missing."),
  check("tags").trim().not().isEmpty().withMessage("News tags is missing."),
];

const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(401).json({ error: error[0].msg });
  }
  next();
};

module.exports = { newsValidator, validate };
