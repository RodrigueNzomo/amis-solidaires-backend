const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { validateAideData } = require("../utils/validators"); // Validation des données d'Aide
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import de la gestion des erreurs de validation
const aideController = require("../controllers/aideController"); // Import du contrôleur pour Aide

const router = express.Router();

// Ajouter une aide (route protégée par l'authentification et la validation des données)
router.post(
  "/",
  authMiddleware,
  validateAideData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const aide = await aideController.createAide(req, res);
      res.status(201).json({ message: "Aide ajoutée avec succès", aide });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer toutes les aides (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const aides = await aideController.getAllAides(req, res);
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

module.exports = router;
