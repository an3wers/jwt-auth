const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } = process.env;

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  console.log("Connect successfully!");
};

module.exports = { connectToDatabase };
