import express, { json } from "express";
import { config } from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js"; // Connexion à la base de données MongoDB

// Import des routes
import membreRoutes from "./routes/membreRoutes.js";
import cotisationRoutes from "./routes/cotisationRoutes.js";
import pretRoutes from "./routes/pretRoutes.js";
import aideRoutes from "./routes/aideRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roleRoutes from "./routes/roleRoutes.js"; // Importation des routes liées aux rôles

// Import des middlewares
import errorHandler from "./middleware/errorHandler"; // Middleware pour la gestion des erreurs
import authMiddleware from "./middleware/authMiddleware"; // Middleware d'authentification

// Middleware pour la validation des données
import { validateMembre } from "./middleware/inputValidator";
import { validateCotisation } from "./middleware/inputValidator";
import { validatePret } from "./middleware/inputValidator";
import { validateAide } from "./middleware/inputValidator";
import { validatePayment } from "./middleware/inputValidator";

// Initialisation de l'application
config();
const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares de sécurité et de logs
app.use(helmet()); // Sécurisation de l'application (headers HTTP)
app.use(morgan("dev")); // Logging des requêtes
app.use(json()); // Parser les corps de requêtes en JSON

// Routes de l'application avec validation et authentification
app.use("/api/membres", authMiddleware, validateMembre, membreRoutes); // Validation et authentification avant les routes
app.use(
  "/api/cotisations",
  authMiddleware,
  validateCotisation,
  cotisationRoutes
); // Authentification et validation pour les cotisations
app.use("/api/prets", authMiddleware, validatePret, pretRoutes); // Authentification et validation pour les prêts
app.use("/api/aides", authMiddleware, validateAide, aideRoutes); // Authentification et validation pour les aides
app.use("/api/payments", authMiddleware, validatePayment, paymentRoutes); // Authentification et validation pour les paiements
app.use("/api/roles", authMiddleware, roleRoutes); // Routes liées aux rôles avec authentification

// Middleware pour la gestion des erreurs
app.use(errorHandler); // Gestion des erreurs à la fin des routes

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
