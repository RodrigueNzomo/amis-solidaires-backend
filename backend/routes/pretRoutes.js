const express = require("express");
const pretController = require("../controllers/pretController");
const authMiddleware = require("../middleware/authMiddleware");
const { validatePretData } = require("../utils/validators"); // Import de la validation des données pour les prêts
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import pour la gestion des erreurs de validation

const router = express.Router();

// Ajouter un prêt (route protégée par l'authentification et la validation des données)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validatePretData, // Validation des données du prêt
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const pret = await pretController.ajouterPret(req, res);
      res.status(201).json({ message: "Prêt ajouté avec succès", pret });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les prêts (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const prets = await pretController.getPrets(req, res);
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
      const pret = await pretController.modifierPret(req, res);
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
    const pret = await pretController.supprimerPret(req, res);
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

module.exports = router;
