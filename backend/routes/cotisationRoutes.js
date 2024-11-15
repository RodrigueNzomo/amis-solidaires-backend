const express = require("express");
const cotisationController = require("../controllers/cotisationController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateCotisationData } = require("../utils/validators"); // Import de la validation des données pour les cotisations
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import de la gestion des erreurs de validation

const router = express.Router();

// Ajouter une cotisation (route protégée par l'authentification et la validation)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validateCotisationData, // Validation des données
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const cotisation = await cotisationController.ajouterCotisation(req, res);
      res
        .status(201)
        .json({ message: "Cotisation ajoutée avec succès", cotisation });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer toutes les cotisations (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cotisations = await cotisationController.getCotisations(req, res);
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

// Modifier une cotisation (route protégée par l'authentification et la validation)
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validateCotisationData, // Validation des données de la cotisation
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const cotisation = await cotisationController.modifierCotisation(
        req,
        res
      );
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

// Supprimer une cotisation (route protégée par l'authentification)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const cotisation = await cotisationController.supprimerCotisation(req, res);
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

module.exports = router;
