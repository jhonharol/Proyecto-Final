console.log("Welcome to Node js");
const express = require("express");
const app = express();
var port = process.env.PORT || 3000;
app.use(express.json());

require("./routes/students.routes.js")(app);

// Database configuration
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// Connect to the database
mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then(() => {
    console.log("Connect to database: success!");
  })
  .catch((err) => {
    console.log("Connect to database: failure!");
    process.exit();
  });
app.get("/", (req, res) => {
  res.json({
    message: "This is a JSON response to a HTTP GET request. cambiar",
  });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

