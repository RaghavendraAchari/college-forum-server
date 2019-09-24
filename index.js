const express = require("express");
const news = require("./routes/news");
const queries = require("./routes/queries");
const users = require("./routes/users");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/news", news);
app.use("/api/queries", queries);
app.use("/api/users", users);

app.get("/", (req, res) => {
  res.send("Server is listening.");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
