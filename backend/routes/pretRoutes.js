import { Router } from "express";
import {
  ajouterPret,
  getPrets,
  modifierPret,
  supprimerPret,
} from "../controllers/pretController.js"; // Contrôleur pour gérer les prêts
import authMiddleware from "../middleware/authMiddleware.js"; // Vérification de l'authentification
import { validatePretData } from "../utils/validators.js"; // Validation des données de prêt
import { handleValidationErrors } from "../middleware/errorHandlerMiddleware.js"; // Gestion des erreurs de validation

const router = Router();

// Ajouter un prêt
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validatePretData, // Validation des données de prêt
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const pret = await ajouterPret(req.body); // Ajouter le prêt
      res.status(201).json({ message: "Prêt ajouté avec succès", pret });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les prêts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const prets = await getPrets();
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

// Modifier un prêt
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validatePretData, // Validation des données de prêt
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const pret = await modifierPret(req.params.id, req.body);
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

// Supprimer un prêt
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const pret = await supprimerPret(req.params.id);
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
