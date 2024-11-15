import { findById } from "../models/Membre";

const checkRole = (roles) => {
  return async (req, res, next) => {
    const { id: userId } = req.user; // L'ID de l'utilisateur

    // Vérifie que l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
      const membre = await findById(userId).select("role");

      if (!membre) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      if (!membre.role) {
        return res
          .status(400)
          .json({ message: "Rôle non défini pour cet utilisateur" });
      }

      // Vérification si l'utilisateur a un rôle valide parmi ceux autorisés
      if (!roles.includes(membre.role)) {
        return res
          .status(403)
          .json({ message: "Accès interdit - Rôle insuffisant" });
      }

      // Si tout va bien, on passe à la suite
      next();
    } catch (error) {
      // Gestion des erreurs serveur
      console.error("Erreur lors de la vérification du rôle:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la vérification du rôle",
        error: error.message,
      });
    }
  };
};

export default checkRole;
