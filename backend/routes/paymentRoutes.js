import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { validatePaymentData } from "../utils/validators.js"; // Import de la validation des données pour les paiements
import { handleValidationErrors } from "../middleware/errorHandler.js"; // Import pour la gestion des erreurs de validation

const router = Router();

// Ajouter un paiement
router.post(
  "/ajouter",
  authMiddleware,
  validatePaymentData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const paiement = await ajouterPaiement(req.body);
      res.status(201).json({
        success: true,
        message: "Paiement ajouté avec succès",
        paiement,
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement:", error.message);
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// Récupérer tous les paiements
router.get("/", authMiddleware, async (req, res) => {
  try {
    const paiements = await getPayments();
    if (!paiements || paiements.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Aucun paiement trouvé" });
    }
    res.json({ success: true, data: paiements });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des paiements:",
      error.message
    );
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
      if (!paiement) {
        return res
          .status(404)
          .json({ success: false, message: "Paiement non trouvé" });
      }
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
    if (!paiement) {
      return res
        .status(404)
        .json({ success: false, message: "Paiement non trouvé" });
    }
    res.json({ success: true, message: "Paiement supprimé avec succès" });
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
