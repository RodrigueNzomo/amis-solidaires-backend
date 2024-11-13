// backend/config/db.js

const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB", err);
    process.exit(1); // Arrêt du processus si la connexion échoue
  }
};

module.exports = connectDB;
