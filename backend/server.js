const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./src/config/db.config");
const PORT = process.env.PORT || 3333;

const citiesRoutes = require("./src/routes/city-routes");
const statesRoutes = require("./src/routes/state-routes");

const mongoose = require("mongoose");

const corsOptions = {
  origin: "http://localhost:8082",
};

express.urlencoded({ extended: true });
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/cities", citiesRoutes);
app.use("/api/states", statesRoutes);

mongoose
  .connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
