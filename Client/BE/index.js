const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("./Public"));

mongoose
  .connect(process.env.DB_URL)
  .then((rslt) =>
    app.listen(process.env.PORT, (r) =>
      console.log(`Running on port ${process.env.PORT}`)
    )
  )
  .catch((err) => console.log(`Error running server ${err}`));

app.use(mainRouter);
