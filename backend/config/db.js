import mongoose from "mongoose"; // Importation de Mongoose pour la gestion de MongoDB
import { MONGO_URI } from "./config.js"; // Importation de la configuration MongoDB

// Fonction pour se connecter à la base de données MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connecté avec succès !"); // Message de confirmation si la connexion réussit
  } catch (error) {
    console.error("Erreur de connexion à MongoDB : ", error.message); // Message d'erreur si la connexion échoue
    process.exit(1); // Terminer le processus si la connexion échoue
  }
};

export default connectDB; // Exportation de la fonction de connexion pour l'utiliser ailleurs
