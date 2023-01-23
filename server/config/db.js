// Require database
const mongoose = require("mongoose");
const { MongoStore } = require("wwebjs-mongo");

const { Client, RemoteAuth } = require("whatsapp-web.js");

mongoose.set("strictQuery", true);
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
      authStrategy: new RemoteAuth({
        store: store,
        backupSyncIntervalMs: 300000,
      }),
    });
    client.initialize();
    console.log("mongodb is connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
