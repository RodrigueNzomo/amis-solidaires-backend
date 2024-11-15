// backend/routes/membreRoutes.js

import { Router } from "express";
import {
  ajouterMembre,
  getMembres,
  modifierMembre,
  supprimerMembre,
} from "../controllers/membreController";
import authMiddleware from "../middleware/authMiddleware";
// Remplacer l'importation par celle-ci, sans 'default'
// import {
//   validateMembreData,
//   validateCotisationData,
//   validatePretData,
//   validateAideData,
//   validatePaymentData,
// } from "../utils/validators.js";

import { validateMembreData } from "../utils/validators.js"; // Import de la validation des données pour les membres
import { handleValidationErrors } from "../middleware/errorHandler"; // Import de la gestion des erreurs de validation

const router = Router();

// Ajouter un membre
router.post(
  "/ajouter",
  authMiddleware,
  validateMembreData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const membre = await ajouterMembre(req.body); // Utilisation de req.body au lieu de req, res
      res.status(201).json({ message: "Membre ajouté avec succès", membre });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les membres
router.get("/", authMiddleware, async (req, res) => {
  try {
    const membres = await getMembres(); // Pas besoin de req, res
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
  handleValidationErrors,
  async (req, res) => {
    try {
      const membre = await modifierMembre(req.params.id, req.body); // Modification avec les paramètres requis
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
    const membre = await supprimerMembre(req.params.id); // Passer seulement req.params.id
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
