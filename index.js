const express = require("express");
const app = express();

const port = process.env.PORT || 3456;

app.get("/", (req, res) => {
  res.send("Server is listening.");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
