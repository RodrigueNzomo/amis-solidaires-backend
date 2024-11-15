// backend/config/db.js

import { connect } from "mongoose";
import { MONGO_URI } from "./config";

const connectDB = async () => {
  try {
    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connexion à MongoDB réussie");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB", err);
    process.exit(1); // Arrêt du processus si la connexion échoue
  }
};

export default connectDB;
