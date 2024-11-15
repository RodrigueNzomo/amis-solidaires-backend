// backend/routes/aideRoutes.js

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
// Remplacer l'importation par celle-ci, sans 'default'
// import {
//   validateMembreData,
//   validateCotisationData,
//   validatePretData,
//   validateAideData,
//   validatePaymentData,
// } from "../utils/validators.js";

import { validateAideDatData } from "../utils/validators.js";
// Validation des données d'Aide
import { handleValidationErrors } from "../middleware/errorHandler"; // Import de la gestion des erreurs de validation
import { createAide, getAllAides } from "../controllers/aideController"; // Import du contrôleur pour Aide

const router = Router();

// Ajouter une aide (route protégée par l'authentification et la validation des données)
router.post(
  "/",
  authMiddleware,
  validateAideData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const aide = await createAide(req.body); // Passe uniquement req.body au contrôleur
      res.status(201).json({ message: "Aide ajoutée avec succès", aide });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer toutes les aides (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const aides = await getAllAides(); // Pas besoin de passer req et res
    if (!aides || aides.length === 0) {
      return res.status(404).json({ message: "Aucune aide trouvée" });
    }
    res.json(aides);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des aides",
      error: error.message,
    });
  }
});

export default router;
