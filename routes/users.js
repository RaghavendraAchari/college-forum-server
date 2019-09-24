const express = require("express");
const router = express.Router();
const Joi = require("joi");

let usersList = [
  { name: "a", id: "1", phone: "6765765" },
  { name: "b", id: "2", phone: "6765765" },
  { name: "c", id: "3", phone: "6765765" },
  { name: "d", id: "4", phone: "6765765" }
];

const validationSchema = {
  id: Joi.number(),
  name: Joi.string()
    .min(1)
    .required(),
  phone: Joi.number()
    .min(10)
    .required()
};

router.get("/", (req, res) => {
  res.send(usersList);
});

router.get("/:id", (req, res) => {
  const user = usersList.find(user => user.id === req.params.id);

  if (!user) res.status(404).send("User Not Found.");

  res.send(JSON.stringify(user));
});

router.post("/", (req, res) => {
  const result = Joi.validate(req.body, validationSchema);
  if (!result) {
    const user = {
      id: usersList.length + 1,
      name: req.body.name,
      phone: req.body.phone
    };
    usersList.push(user);
    res.send(JSON.stringify(user));
  } else {
    res.send(result.error.message);
  }
});

router.delete("/:id", (req, res) => {
  const user = usersList.find(u => u.id === req.params.id);

  if (!user) return res.status(404).send("User not found");

  users = usersList.filter(u => u.id !== req.params.id);
  usersList = users;

  res.send(user);
});

module.exports = router;
