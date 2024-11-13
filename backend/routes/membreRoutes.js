// backend/routes/membreRoutes.js

const express = require("express");
const membreController = require("../controllers/membreController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateMembre } = require("../middleware/inputValidator"); // Validation des données pour les membres

const router = express.Router();

// Routes protégées avec authentification
router.post(
  "/ajouter",
  authMiddleware,
  validateMembre,
  membreController.ajouterMembre
); // Ajouter un membre
router.get("/", authMiddleware, membreController.getMembres); // Récupérer tous les membres
router.put(
  "/:id",
  authMiddleware,
  validateMembre,
  membreController.modifierMembre
); // Modifier un membre
router.delete("/:id", authMiddleware, membreController.supprimerMembre); // Supprimer un membre

module.exports = router;
