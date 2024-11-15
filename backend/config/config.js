// backend/config/config.js
import { config } from "dotenv";

// Chargement des variables d'environnement à partir du fichier .env
config();

export const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/amis-solidaires";
export const jwtSecret = process.env.JWT_SECRET || "votre-clé-secrète";
export const port = process.env.PORT || 5000; // Ajout de la variable de port si nécessaire
