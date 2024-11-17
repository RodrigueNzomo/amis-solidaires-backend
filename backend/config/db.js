// backend/config/db.js

import mongoose from "mongoose"; // Import de Mongoose

// Récupération de la chaîne de connexion MongoDB depuis les variables d'environnement
import { MONGO_URI } from "./config.js";

const connectDB = async () => {
  try {
    // Connexion à MongoDB avec les options recommandées
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB : ", error.message);
    process.exit(1); // Arrêt du processus en cas d'erreur critique
  }
};

export default connectDB;
