// backend/routes/cotisationRoutes.js

const express = require("express");
const cotisationController = require("../controllers/cotisationController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateCotisation } = require("../middleware/inputValidator"); // Validation des données pour les cotisations

const router = express.Router();

// Routes protégées avec authentification
router.post(
  "/ajouter",
  authMiddleware,
  validateCotisation,
  cotisationController.ajouterCotisation
); // Ajouter une cotisation
router.get("/", authMiddleware, cotisationController.getCotisations); // Récupérer toutes les cotisations
router.put(
  "/:id",
  authMiddleware,
  validateCotisation,
  cotisationController.modifierCotisation
); // Modifier une cotisation
router.delete("/:id", authMiddleware, cotisationController.supprimerCotisation); // Supprimer une cotisation

module.exports = router;
