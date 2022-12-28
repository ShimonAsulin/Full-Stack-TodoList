const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const db = process.env.MONGO_URI;

console.log(db);
const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
