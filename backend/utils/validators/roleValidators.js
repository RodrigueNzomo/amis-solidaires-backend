import { findById } from "../../models/Membre.js"; // Assure-toi que ton modèle Membre a la méthode findById

export const validateRole = async (userId, allowedRoles) => {
  const membre = await findById(userId).select("role");
  if (!membre) {
    throw new Error("Utilisateur non trouvé");
  }
  return allowedRoles.includes(membre.role); // Retourne si le rôle est valide
};
