const express = require("express");
const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");
const { validatePaymentData } = require("../utils/validators"); // Import de la validation des données pour les paiements
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import pour la gestion des erreurs de validation

const router = express.Router();

// Ajouter un paiement (route protégée par l'authentification et la validation des données)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validatePaymentData, // Validation des données du paiement
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const paiement = await paymentController.ajouterPaiement(req, res);
      res
        .status(201)
        .json({ message: "Paiement ajouté avec succès", paiement });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les paiements (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const paiements = await paymentController.getPayments(req, res);
    if (!paiements || paiements.length === 0) {
      return res.status(404).json({ message: "Aucun paiement trouvé" });
    }
    res.json(paiements);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des paiements",
      error: error.message,
    });
  }
});

// Modifier un paiement par ID (route protégée par l'authentification et la validation)
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validatePaymentData, // Validation des données du paiement
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const paiement = await paymentController.modifierPaiement(req, res);
      if (!paiement) {
        return res.status(404).json({ message: "Paiement non trouvé" });
      }
      res.json({ message: "Paiement modifié avec succès", paiement });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la modification du paiement",
        error: error.message,
      });
    }
  }
);

// Supprimer un paiement par ID (route protégée par l'authentification)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paiement = await paymentController.supprimerPaiement(req, res);
    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }
    res.json({ message: "Paiement supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du paiement",
      error: error.message,
    });
  }
});

module.exports = router;
