// backend/routes/cotisationRoutes.js

import { Router } from "express";
import {
  ajouterCotisation,
  getCotisations,
  modifierCotisation,
  supprimerCotisation,
} from "../controllers/cotisationController.js";
import { validateCotisationData } from "../utils/validators.js"; // Importation du validateur
import { handleValidationErrors } from "../middleware/errorHandler.js"; // Gestion des erreurs
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Ajouter une cotisation
router.post(
  "/ajouter",
  authMiddleware,
  validateCotisationData, // Utilisation de la validation des données de cotisation
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const cotisation = await ajouterCotisation(req.body); // Ajouter la cotisation
      res
        .status(201)
        .json({ message: "Cotisation ajoutée avec succès", cotisation });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer toutes les cotisations
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cotisations = await getCotisations();
    if (!cotisations || cotisations.length === 0) {
      return res.status(404).json({ message: "Aucune cotisation trouvée" });
    }
    res.json(cotisations);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des cotisations",
      error: error.message,
    });
  }
});

// Modifier une cotisation
router.put(
  "/:id",
  authMiddleware,
  validateCotisationData,
  handleValidationErrors, // Validation et gestion des erreurs
  async (req, res) => {
    try {
      const cotisation = await modifierCotisation(req.params.id, req.body);
      if (!cotisation) {
        return res.status(404).json({ message: "Cotisation non trouvée" });
      }
      res.json({ message: "Cotisation modifiée avec succès", cotisation });
    } catch (error) {
      res.status(500).json({
        message: "Erreur serveur lors de la modification de la cotisation",
        error: error.message,
      });
    }
  }
);

// Supprimer une cotisation
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cotisation = await supprimerCotisation(req.params.id);
    if (!cotisation) {
      return res.status(404).json({ message: "Cotisation non trouvée" });
    }
    res.json({ message: "Cotisation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la suppression de la cotisation",
      error: error.message,
    });
  }
});

export default router;
