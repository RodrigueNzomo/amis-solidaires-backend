// backend/routes/paymentRoutes.js

import { Router } from "express";
import { ajouterPaiement, getPayments, modifierPaiement, supprimerPaiement } from "../controllers/paymentController";
import authMiddleware from "../middleware/authMiddleware";
import default from "../utils/validators";
const { validatePaymentData } = default; // Import de la validation des données pour les paiements
import { handleValidationErrors } from "../middleware/errorHandler"; // Import pour la gestion des erreurs de validation

const router = Router();

// Ajouter un paiement (route protégée par l'authentification et la validation des données)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validatePaymentData, // Validation des données du paiement
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      // Utilisation de la fonction du contrôleur pour ajouter un paiement
      const paiement = await ajouterPaiement(req.body); // Assurez-vous d'utiliser req.body directement
      res
        .status(201)
        .json({ message: "Paiement ajouté avec succès", paiement });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les paiements
router.get("/", authMiddleware, async (req, res) => {
  try {
    const paiements = await getPayments(); // Modification pour ne pas passer req, res
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

// Modifier un paiement
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validatePaymentData, // Validation des données du paiement
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const paiement = await modifierPaiement(
        req.params.id,
        req.body
      ); // Passer id et body
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

// Supprimer un paiement
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const paiement = await supprimerPaiement(req.params.id); // Passer uniquement l'id
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

export default router;
