// backend/routes/paymentRoutes.js

import { Router } from "express";
import {
  ajouterPaiement,
  getPaiements,
  modifierPaiement,
  supprimerPaiement,
} from "../services/paymentService.js"; // Import du service de paiement
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware d'authentification
import { validatePaymentData } from "../utils/validators.js"; // Validateur des données de paiement
import { handleValidationErrors } from "../middleware/errorHandlerMiddleware.js"; // Gestion des erreurs

const router = Router();

// Ajouter un paiement
router.post(
  "/ajouter",
  authMiddleware,
  validatePaymentData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const paiement = await ajouterPaiement(req.body); // Ajouter le paiement
      res.status(201).json({
        success: true,
        message: "Paiement ajouté avec succès",
        paiement,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement:", error.message);
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
);

// Récupérer tous les paiements
router.get("/", authMiddleware, async (req, res) => {
  try {
    const paiements = await getPaiements();
    res.json({
      success: true,
      data: paiements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la récupération des paiements",
      error: error.message,
    });
  }
});

// Modifier un paiement
router.put(
  "/:id",
  authMiddleware,
  validatePaymentData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const paiement = await modifierPaiement(req.params.id, req.body);
      res.json({
        success: true,
        message: "Paiement modifié avec succès",
        paiement,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la modification du paiement:",
        error.message
      );
      res.status(500).json({
        success: false,
        message: "Erreur serveur lors de la modification du paiement",
        error: error.message,
      });
    }
  }
);

// Supprimer un paiement
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paiement = await supprimerPaiement(req.params.id);
    res.json({
      success: true,
      message: "Paiement supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du paiement:", error.message);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression du paiement",
      error: error.message,
    });
  }
});

export default router;
