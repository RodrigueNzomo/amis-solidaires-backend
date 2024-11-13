// backend/routes/pretRoutes.js

const express = require("express");
const pretController = require("../controllers/pretController");
const authMiddleware = require("../middleware/authMiddleware");
const { validatePret } = require("../middleware/inputValidator"); // Validation des données pour les prêts

const router = express.Router();

// Routes protégées avec authentification
router.post(
  "/ajouter",
  authMiddleware,
  validatePret,
  pretController.ajouterPret
); // Ajouter un prêt
router.get("/", authMiddleware, pretController.getPrets); // Récupérer tous les prêts
router.put("/:id", authMiddleware, validatePret, pretController.modifierPret); // Modifier un prêt
router.delete("/:id", authMiddleware, pretController.supprimerPret); // Supprimer un prêt

module.exports = router;
