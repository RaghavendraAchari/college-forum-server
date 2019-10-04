const mangoose = require("mongoose");

mangoose
  .connect("mpngodb://localhost/college")
  .then(msg => console.log("Connected to base.."))
  .catch(err => console.log("Error in connecting to database.."));
