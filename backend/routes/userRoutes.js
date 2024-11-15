const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateIdParam } = require("../utils/validators"); // Import de la validation de l'ID
const { handleValidationErrors } = require("../middleware/errorHandler"); // Import pour la gestion des erreurs de validation

const router = express.Router();

// Récupérer les détails d'un utilisateur
router.get(
  "/:id",
  authMiddleware, // Vérification de l'authentification
  validateIdParam, // Validation de l'ID utilisateur
  handleValidationErrors, // Gestion des erreurs de validation
  async (req, res) => {
    try {
      // Vérification que l'utilisateur demande ses propres informations
      if (req.user.id !== req.params.id) {
        return res.status(403).json({ message: "Accès interdit" });
      }

      const user = await userController.getUserDetails(req, res);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Erreur serveur lors de la récupération des détails de l'utilisateur",
        error: error.message,
      });
    }
  }
);

// Récupérer tous les utilisateurs
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await userController.getAllUsers(req, res);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Aucun utilisateur trouvé" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des utilisateurs",
      error: error.message,
    });
  }
});

module.exports = router;
