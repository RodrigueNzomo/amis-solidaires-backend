// backend/config/config.js

// Chargement des variables d'environnement à partir du fichier .env
require("dotenv").config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI, // URI de connexion à la base de données MongoDB
  PORT: process.env.PORT, // Port du serveur, utilisé dans app.js
  JWT_SECRET: process.env.JWT_SECRET, // Clé secrète pour les JWT
  JWT_EXPIRATION: process.env.JWT_EXPIRATION, // Temps d'expiration du JWT
};
