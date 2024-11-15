// backend/routes/membreRoutes.js

import { Router } from "express";
import {
  ajouterMembre,
  getMembres,
  modifierMembre,
  supprimerMembre,
} from "../controllers/membreController"; // Assurez-vous que ces fonctions sont exportées correctement
import authMiddleware from "../middleware/authMiddleware";
import { validateMembreData } from "../utils/validators.js"; // Validation des données pour les membres
import { handleValidationErrors } from "../middleware/errorHandler"; // Gestion des erreurs de validation

const router = Router();

// Ajouter un membre
router.post(
  "/ajouter",
  authMiddleware,
  validateMembreData,
  handleValidationErrors, // Validation et gestion des erreurs
  async (req, res) => {
    try {
      const membre = await ajouterMembre(req.body); // Passer les données du corps de la requête
      res.status(201).json({ message: "Membre ajouté avec succès", membre });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les membres
router.get("/", authMiddleware, async (req, res) => {
  try {
    const membres = await getMembres(); // Fonction pour récupérer les membres
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

// Modifier un membre par ID
router.put(
  "/:id",
  authMiddleware,
  validateMembreData,
  handleValidationErrors, // Validation et gestion des erreurs
  async (req, res) => {
    try {
      const membre = await modifierMembre(req.params.id, req.body); // Passer l'id et les données du corps
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

// Supprimer un membre par ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const membre = await supprimerMembre(req.params.id); // Passer l'ID pour supprimer le membre
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
