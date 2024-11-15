const express = require("express");
const membreController = require("../controllers/membreController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateMembreData } = require("../utils/validators"); // Import de la validation des données pour les membres
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import de la gestion des erreurs de validation

const router = express.Router();

// Ajouter un membre (route protégée par l'authentification et la validation des données)
router.post(
  "/ajouter",
  authMiddleware, // Vérification de l'authentification
  validateMembreData, // Validation des données du membre
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const membre = await membreController.ajouterMembre(req, res);
      res.status(201).json({ message: "Membre ajouté avec succès", membre });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

// Récupérer tous les membres (route protégée par l'authentification)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const membres = await membreController.getMembres(req, res);
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

// Modifier un membre par ID (route protégée par l'authentification et la validation)
router.put(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validateMembreData, // Validation des données du membre
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      const membre = await membreController.modifierMembre(req, res);
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

// Supprimer un membre par ID (route protégée par l'authentification)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const membre = await membreController.supprimerMembre(req, res);
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

module.exports = router;
