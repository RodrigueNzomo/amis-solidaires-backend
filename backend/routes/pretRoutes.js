import { Router } from "express";
import {
  ajouterPret,
  getPrets,
  modifierPret,
  supprimerPret,
} from "../controllers/pretController.js"; // Assurez-vous que le chemin est correct
import authMiddleware from "../middleware/authMiddleware.js";
import { validatePretData } from "../utils/validators.js";
import { handleValidationErrors } from "../middleware/errorHandler.js";

const router = Router();

router.post(
  "/ajouter",
  authMiddleware,
  validatePretData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const pret = await ajouterPret(req.body);
      res.status(201).json({ message: "Prêt ajouté avec succès", pret });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const prets = await getPrets();
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

router.put(
  "/:id",
  authMiddleware,
  validatePretData,
  handleValidationErrors,
  async (req, res) => {
    try {
      const pret = await modifierPret(req.params.id, req.body);
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

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const pret = await supprimerPret(req.params.id);
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

export default router;
