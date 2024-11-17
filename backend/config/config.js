// backend/config/config.js
import dotenv from "dotenv";

dotenv.config(); // Charge les variables d'environnement

export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/amis-solidaires";
export const JWT_SECRET = process.env.JWT_SECRET || "votre-clé-secrète";
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h";
export const PORT = process.env.PORT || 5000;
