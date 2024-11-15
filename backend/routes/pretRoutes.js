// backend/routes/pretRoutes.js

import { Router } from "express";
import {
  ajouterPret,
  getPrets,
  modifierPret,
  supprimerPret,
} from "../controllers/pretController.js"; // Assurez-vous que le contrôleur est bien importé
import authMiddleware from "../middleware/authMiddleware.js";
import { validatePretData } from "../utils/validators.js"; // Assurez-vous que cette validation est correctement importée
import { handleValidationErrors } from "../middleware/errorHandler.js"; // Assurez-vous que la gestion des erreurs est importée

const router = Router();

// Ajouter un prêt (route protégée par l'authentification et la validation des données)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validatePretData, // Validation des données du prêt
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      // Ajouter un prêt en appelant le contrôleur
      const pret = await ajouterPret(req, res); // Envoie des données du prêt
      res.status(201).json({ message: "Prêt ajouté avec succès", pret });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les prêts (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const prets = await getPrets(req, res);
    if (!prets || prets.length === 0) {
      return res.status(404).json({ message: "Aucun prêt trouvé" });
    }
    res.json(prets);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des prêts",
      error: error.message,
    });
  }
});

// Modifier un prêt par ID (route protégée par l'authentification et la validation)
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validatePretData, // Validation des données du prêt
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const pret = await modifierPret(req, res);
      if (!pret) {
        return res.status(404).json({ message: "Prêt non trouvé" });
      }
      res.json({ message: "Prêt modifié avec succès", pret });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la modification du prêt",
        error: error.message,
      });
    }
  }
);

// Supprimer un prêt par ID (route protégée par l'authentification)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const pret = await supprimerPret(req, res);
    if (!pret) {
      return res.status(404).json({ message: "Prêt non trouvé" });
    }
    res.json({ message: "Prêt supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du prêt",
      error: error.message,
    });
  }
});

export default router;
