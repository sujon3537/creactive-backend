const mongoose = require("mongoose");

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_DBNAME;

const dbConnect = () => {
  mongoose
    .connect(
      `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.km2vh9e.mongodb.net/${dbName}?retryWrites=true&w=majority`
    )
    .then(() => console.log("Database Connected"));
};

module.exports = dbConnect;
