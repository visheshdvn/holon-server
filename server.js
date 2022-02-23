const express = require("express");
require("dotenv").config();

const p5Instance = require("./utils/generateArt/sketch");
// console.log();

// routes
const routes = require("./routes/routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));
app.use("/api", routes);

const listener = app.listen(PORT, () =>
  console.log(`Hello world app listening on port ${listener.address().port}!`)
);
