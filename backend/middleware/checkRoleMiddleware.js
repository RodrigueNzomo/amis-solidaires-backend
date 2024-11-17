import { validateRole } from "../utils/validators/roleValidators.js"; // Importation de la validation des rôles

/**
 * Middleware qui vérifie si l'utilisateur a le rôle requis.
 * @param {Array} roles - Liste des rôles autorisés à accéder à la ressource
 * @returns {Function} - Retourne une fonction middleware pour vérifier le rôle de l'utilisateur
 */
const checkRole = (roles) => {
  return async (req, res, next) => {
    const { id: userId } = req.user; // On récupère l'ID de l'utilisateur depuis `req.user` (défini après l'authentification)

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié" }); // Si aucun utilisateur n'est authentifié
    }

    try {
      // Utilisation de la fonction de validation des rôles
      const isValidRole = await validateRole(userId, roles);
      if (!isValidRole) {
        return res
          .status(403)
          .json({ message: "Accès interdit - Rôle insuffisant" }); // Si le rôle n'est pas valide
      }
      next(); // Si le rôle est valide, on passe à l'étape suivante (prochaine middleware ou route)
    } catch (error) {
      console.error("Erreur lors de la vérification du rôle:", error.message);
      res.status(500).json({
        message: "Erreur serveur lors de la vérification du rôle",
        error: error.message,
      });
    }
  };
};

export default checkRole;
