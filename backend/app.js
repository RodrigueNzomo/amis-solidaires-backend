import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js"; // Connexion à la base de données MongoDB
import { port } from "./config/config.js"; // Importation du port depuis config
// Import des routes
import membreRoutes from "./routes/membreRoutes.js";
import cotisationRoutes from "./routes/cotisationRoutes.js";
import pretRoutes from "./routes/pretRoutes.js";
import aideRoutes from "./routes/aideRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";

// Import des validateurs
import {
  validateMembreData,
  validateCotisationData,
  validatePretData,
  validateAideData,
  validatePaymentData,
} from "./utils/validators.js";

// Import des middlewares
import errorHandler from "./middleware/errorHandler.js"; // Middleware pour la gestion des erreurs
import authMiddleware from "./middleware/authMiddleware.js"; // Middleware d'authentification

// Initialisation de l'application
dotenv.config();
const app = express();

// Connexion à la base de données MongoDB
connectDB();

// Middlewares de sécurité et de logs
app.use(helmet()); // Sécurisation de l'application (headers HTTP)
app.use(morgan("dev")); // Logging des requêtes
app.use(express.json()); // Parser les corps de requêtes en JSON

// Routes de l'application avec validation et authentification
app.use("/api/membres", authMiddleware, validateMembreData, membreRoutes);
app.use(
  "/api/cotisations",
  authMiddleware,
  validateCotisationData,
  cotisationRoutes
);
app.use("/api/prets", authMiddleware, validatePretData, pretRoutes);
app.use("/api/aides", authMiddleware, validateAideData, aideRoutes);
app.use("/api/payments", authMiddleware, validatePaymentData, paymentRoutes);
app.use("/api/roles", authMiddleware, roleRoutes);

// Middleware pour la gestion des erreurs
app.use(errorHandler); // Gestion des erreurs à la fin des routes

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
