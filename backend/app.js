const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db"); // Connexion à la base de données MongoDB

// Import des routes
const membreRoutes = require("./routes/membreRoutes");
const cotisationRoutes = require("./routes/cotisationRoutes");
const pretRoutes = require("./routes/pretRoutes");
const aideRoutes = require("./routes/aideRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const roleRoutes = require("./routes/roleRoutes"); // Importation des routes liées aux rôles

// Import des middlewares
const errorHandler = require("./middleware/errorHandler"); // Middleware pour la gestion des erreurs
const authMiddleware = require("./middleware/authMiddleware"); // Middleware d'authentification

// Middleware pour la validation des données
const validateMembre = require("./middleware/inputValidator").validateMembre;
const validateCotisation =
  require("./middleware/inputValidator").validateCotisation;
const validatePret = require("./middleware/inputValidator").validatePret;
const validateAide = require("./middleware/inputValidator").validateAide;
const validatePayment = require("./middleware/inputValidator").validatePayment;

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
