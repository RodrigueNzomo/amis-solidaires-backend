import Membre from "../../models/Membre.js"; // Importer directement le modèle Membre

// Fonction pour valider un rôle
export const validateRole = async (userId, allowedRoles) => {
  const membre = await Membre.findById(userId).select("role"); // Utilisation de findById sur le modèle Membre
  if (!membre) {
    throw new Error("Utilisateur non trouvé");
  }
  return allowedRoles.includes(membre.role); // Retourne si le rôle est valide
};
