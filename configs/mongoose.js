const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, {
    family: 4,
    connectTimeoutMS: 15000,
    maxPoolSize: 100,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log("Database connection error ", error);
  });

const db = mongoose.connection;

module.exports = db;
