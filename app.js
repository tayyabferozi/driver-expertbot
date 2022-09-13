require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", require("./routes/user-routes"));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("works!");
});

app.use("/api/trips", require("./routes/trip-routes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server started on port " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
