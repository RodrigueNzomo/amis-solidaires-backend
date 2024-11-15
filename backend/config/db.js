// backend/config/db.js
import { connect } from "mongoose";
import { mongoURI } from "./config"; // Importation correcte de la config.js

const connectDB = async () => {
  try {
    await connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté avec succès !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB : ", error.message);
    process.exit(1); // Quitte le processus en cas d'erreur
  }
};

export default connectDB; // Exportation avec export default
