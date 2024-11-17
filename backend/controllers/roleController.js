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
// backend/controllers/roleController.js

// Exemple de la fonction getMemberById
export const getMemberById = async (id) => {
  try {
    const membre = await Membre.findById(id); // Assurez-vous que vous avez importé le modèle Membre
    if (!membre) {
      throw new Error("Membre non trouvé");
    }
    return membre;
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération du membre: ${error.message}`
    );
  }
};

// Exportation de toutes les fonctions nécessaires
export default {
  getMemberById,
  // Ajoutez d'autres exports pour les autres fonctions du contrôleur
};
