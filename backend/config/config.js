import * as dotenv from "dotenv";
dotenv.config();

config(); // Charge les variables d'environnement à partir du fichier .env

// Exportation des configurations
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/amis-solidaires";
export const JWT_SECRET = process.env.JWT_SECRET || "votre-clé-secrète";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"; // Exemple de durée pour le token
export const PORT = process.env.PORT || 5000; // Port par défaut
