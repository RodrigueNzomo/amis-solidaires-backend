// backend/config/config.js

// Chargement des variables d'environnement à partir du fichier .env
require("dotenv").config();

export const MONGO_URI = process.env.MONGO_URI;
export const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
