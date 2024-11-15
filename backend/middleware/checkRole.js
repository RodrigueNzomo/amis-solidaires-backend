const Membre = require("../models/Membre");

const checkRole = (roles) => {
  return async (req, res, next) => {
    const { id: userId, role: userRole } = req.user; // L'ID de l'utilisateur et son rôle

    // Vérifie que l'utilisateur est authentifié
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" });
    }

    try {
      const membre = await Membre.findById(userId).select("role"); // On récupère seulement le rôle

      if (!membre) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
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
      console.error(error);
      res.status(500).json({
        message: "Erreur serveur lors de la vérification du rôle",
        error: error.message,
      });
    }
  };
};

module.exports = checkRole;
