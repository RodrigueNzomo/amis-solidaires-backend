import { Router } from "express";
import {
  ajouterMembre,
  getMembres,
  modifierMembre,
  supprimerMembre,
} from "../controllers/membreController.js"; // Contrôleur pour gérer le Membre
import { handleValidationErrors } from "../middleware/errorHandler.js"; // Gestion des erreurs de validation
import { validateMembreData } from "../utils/validators.js"; // Validation des données de Membre
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Ajouter un membre
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validateMembreData, // Validation des données de Membre
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const membre = await ajouterMembre(req.body); // Ajouter le membre
      res.status(201).json({ message: "Membre ajouté avec succès", membre });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les membres
router.get("/", authMiddleware, async (req, res) => {
  try {
    const membres = await getMembres();
    if (!membres || membres.length === 0) {
      return res.status(404).json({ message: "Aucun membre trouvé" });
    }
    res.json(membres);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des membres",
      error: error.message,
    });
  }
});

// Modifier un membre
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validateMembreData, // Validation des données de Membre
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const membre = await modifierMembre(req.params.id, req.body);
      if (!membre) {
        return res.status(404).json({ message: "Membre non trouvé" });
      }
      res.json({ message: "Membre modifié avec succès", membre });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la modification du membre",
        error: error.message,
      });
    }
  }
);

// Supprimer un membre
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const membre = await supprimerMembre(req.params.id);
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    res.json({ message: "Membre supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression du membre",
      error: error.message,
    });
  }
});

export default router;
