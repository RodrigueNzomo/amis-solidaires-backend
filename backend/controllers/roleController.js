import Membre from "../models/Membre.js"; // Import du modèle Membre

const validRoles = [
  "President",
  "Tresorier",
  "Commissaire aux comptes",
  "Censeur",
  "President Comité",
  "Membre",
];

// Fonction utilitaire pour vérifier l'existence du rôle
const isValidRole = (role) => validRoles.includes(role);

// Méthode pour assigner un rôle à un membre
export const assignRole = async (membreId, role) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide");
  }

  const membre = await Membre.findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour récupérer tous les membres
export const getAllMembers = async () => {
  return await Membre.find();
};
