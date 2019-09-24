const express = require("express");
const Joi = require("joi");

const router = express.Router();

const newsList = [
  { id: "1", title: "News 1" },
  { id: "2", title: "News 2" },
  { id: "3", title: "News 3" },
  { id: "4", title: "News 4" }
];

const validationSchema = {
  id: Joi.number(),
  title: Joi.string().required()
};

router.get("/", (req, res) => {
  res.send(newsList);
});

router.get("/:id", (req, res) => {
  const news = newsList.find(news => news.id === req.params.id);

  if (!news) res.status(404).send("News Not Found");

  res.send(JSON.stringify(news));
});

router.post("/", (req, res) => {
  const result = Joi.validate(req.body, validationSchema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  } else {
    const news = {
      id: newsList.length + 1,
      title: req.body.title
    };
    newsList.push(news);
    res.send(JSON.stringify(news));
  }
});

module.exports = router;
