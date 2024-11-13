// backend/routes/paymentRoutes.js

const express = require("express");
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const { validatePayment } = require("../middleware/inputValidator"); // Validation des données pour les paiements

const router = express.Router();

// Routes protégées avec authentification
router.post(
  "/ajouter",
  authMiddleware,
  validatePayment,
  paymentController.ajouterPaiement
); // Ajouter un paiement
router.get("/", authMiddleware, paymentController.getPayments); // Récupérer tous les paiements
router.put(
  "/:id",
  authMiddleware,
  validatePayment,
  paymentController.modifierPaiement
); // Modifier un paiement
router.delete("/:id", authMiddleware, paymentController.supprimerPaiement); // Supprimer un paiement

module.exports = router;
