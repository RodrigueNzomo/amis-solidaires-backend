import * as dotenv from "dotenv"; // Chargement des variables d'environnement à partir du fichier .env

dotenv.config(); // Charger les variables d'environnement

// Exporter les variables de configuration pour les utiliser dans le projet
export const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/amis-solidaires"; // URI de connexion MongoDB

export const JWT_SECRET = process.env.JWT_SECRET || "votre-clé-secrète"; // Clé secrète JWT pour l'authentification
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "1h"; // Durée d'expiration du token JWT
export const PORT = process.env.PORT || 5000; // Port d'écoute du serveur
