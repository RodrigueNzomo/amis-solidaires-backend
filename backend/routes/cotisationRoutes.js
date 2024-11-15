// backend/routes/cotisationRoutes.js

import { Router } from "express";
import {
  ajouterCotisation,
  getCotisations,
  modifierCotisation,
  supprimerCotisation,
} from "../controllers/cotisationController";
import authMiddleware from "../middleware/authMiddleware";
// Remplacer l'importation par celle-ci, sans 'default'
// import {
//   validateMembreData,
//   validateCotisationData,
//   validatePretData,
//   validateAideData,
//   validatePaymentData,
// } from "../utils/validators.js";

import { validateCotisationData } from "../utils/validators.js";

import { handleValidationErrors } from "../middleware/errorHandler";

const router = Router();

// Ajouter une cotisation
router.post(
  "/ajouter",
  authMiddleware,
  validateCotisationData,
  handleValidationErrors,
  async (req, res) => {
    try {
      // Envoie directement req.body au contrôleur sans req et res
      const cotisation = await ajouterCotisation(req.body);
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
  handleValidationErrors,
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
