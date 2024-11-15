// backend/routes/roleRoutes.js
import { Router } from "express";
import checkRole from "../middleware/checkRole.js";
import {
  assignRole,
  getAllMembers,
  getMemberById,
  getMemberRole,
  updateMemberRole,
  removeRoleFromMember,
} from "../controllers/roleController.js";

const router = Router();

// Route pour l'ajout d'un rôle spécifique (uniquement par Président)
router.put("/assigner/:id", checkRole(["President"]), async (req, res) => {
  try {
    const { role } = req.body; // Récupère le rôle à attribuer
    const membreId = req.params.id;

    // Validation du rôle
    const validRoles = [
      "President",
      "Tresorier",
      "Commissaire aux comptes",
      "Censeur",
      "President Comité",
      "Membre",
    ];

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Rôle invalide" });
    }

    // Appel du contrôleur pour mettre à jour le rôle du membre
    const updatedMembre = await assignRole(membreId, role);
    res.json({ message: "Rôle assigné avec succès", membre: updatedMembre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir tous les membres (rôles : Président, Trésorier, Commissaire aux comptes)
router.get(
  "/membres",
  checkRole(["President", "Tresorier", "Commissaire aux comptes"]),
  async (req, res) => {
    try {
      const membres = await getAllMembers();
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
  }
);

// Route pour récupérer un membre par ID (accessible uniquement par Président et Censeur)
router.get(
  "/membre/:id",
  checkRole(["President", "Censeur"]),
  async (req, res) => {
    try {
      const membre = await getMemberById(req.params.id);
      if (!membre) {
        return res.status(404).json({ message: "Membre non trouvé" });
      }
      res.json(membre);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  }
);

// Route pour récupérer le rôle d'un membre (accessible uniquement par Président)
router.get("/role/:id", checkRole(["President"]), async (req, res) => {
  try {
    const membre = await getMemberRole(req.params.id);
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    res.json({ message: "Rôle du membre", role: membre.role });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Route pour modifier un rôle pour un utilisateur (accessible uniquement par Président)
router.put("/modifier-role/:id", checkRole(["President"]), async (req, res) => {
  try {
    const { role } = req.body; // Récupère le rôle à attribuer
    const updatedMembre = await updateMemberRole(req.params.id, role);
    res.json({ message: "Rôle mis à jour avec succès", membre: updatedMembre });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer un rôle (accessible par Président ou Censeur)
router.delete(
  "/supprimer-role/:id",
  checkRole(["President", "Censeur"]),
  async (req, res) => {
    try {
      const membreId = req.params.id;
      const result = await removeRoleFromMember(membreId);
      if (result) {
        res.json({ message: "Rôle supprimé avec succès" });
      } else {
        res.status(404).json({ message: "Membre non trouvé" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

export default router;
