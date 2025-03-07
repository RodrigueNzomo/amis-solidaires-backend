import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Vérification de l'authentification
import { handleValidationErrors } from "../middleware/errorHandlerMiddleware.js"; // Gestion des erreurs de validation
import { validateAideData } from "../utils/validators.js"; // Validation des données de l'Aide
import { createAide, getAllAides } from "../controllers/aideController.js"; // Contrôleur pour gérer l'Aide

const router = Router();

// Ajouter une aide (route protégée par l'authentification et la validation des données)
router.post(
  "/",
  authMiddleware, // Vérification de l'authentification
  validateAideData, // Validation des données de l'Aide
  handleValidationErrors, // Gestion des erreurs de validation
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
