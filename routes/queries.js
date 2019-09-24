const express = require("express");
const Joi = require("joi");

const router = express.Router();

var queryList = [
  { id: "1", title: "query 1" },
  { id: "2", title: "query 2" },
  { id: "3", title: "query 3" },
  { id: "4", title: "query 4" }
];

const validationSchema = {
  id: Joi.number(),
  title: Joi.string().required()
};

router.get("/", (req, res) => {
  res.send(queryList);
});

router.get("/:id", (req, res) => {
  const query = queryList.find(query => query.id === req.params.id);

  if (!query) res.status(404).send("Query Not Found");

  res.send(JSON.stringify(query));
});

router.post("/", (req, res) => {
  const result = Joi.validate(req.body, validationSchema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  } else {
    let query = {
      id: `${queryList.length + 1}`,
      title: req.body.title
    };

    queryList.push(query);
    console.log(queryList);

    res.send(JSON.stringify(query));
  }
});

router.delete("/:id", (req, res) => {
  const query = queryList.find(q => q.id === req.params.id);

  if (!query) return res.status(404).send("Query not found");

  redeucedList = queryList.filter(q => {
    return q.id !== req.params.id;
  });
  queryList = redeucedList;

  res.send(query);
});

module.exports = router;
