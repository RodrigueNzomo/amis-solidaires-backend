import { Router } from "express";
import { getUserDetails, getAllUsers } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js"; // Vérification de l'authentification

import { validateIdParam } from "../utils/validators.js"; // Import de la validation de l'ID
import { handleValidationErrors } from "../middleware/errorHandlerMiddleware.js"; // Import pour la gestion des erreurs de validation

const router = Router();

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

      const user = await getUserDetails(req, res);
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
    const users = await getAllUsers(req, res);
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

export default router;
