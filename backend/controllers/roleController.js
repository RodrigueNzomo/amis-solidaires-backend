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

// Méthode pour récupérer un membre par ID
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

// Fonction pour récupérer le rôle d'un membre
export const getMemberRole = async (id) => {
  const membre = await Membre.findById(id);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }
  return membre.role; // Retourne le rôle du membre
};

// Fonction pour supprimer un rôle et réinitialiser le rôle d'un membre à "Membre"
export const removeRoleFromMember = async (membreId) => {
  try {
    // Recherche du membre par son ID
    const membre = await Membre.findById(membreId);

    if (!membre) {
      throw new Error("Membre non trouvé");
    }

    // Réinitialisation du rôle à "Membre"
    membre.role = "Membre";

    // Sauvegarde des changements
    await membre.save();

    return membre; // Retourner le membre avec son rôle mis à jour
  } catch (error) {
    throw new Error(`Erreur lors de la suppression du rôle : ${error.message}`);
  }
};

// Nouvelle fonction pour mettre à jour un rôle pour un membre
export const updateMemberRole = async (membreId, newRole) => {
  if (!isValidRole(newRole)) {
    throw new Error("Rôle invalide");
  }

  const membre = await Membre.findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = newRole;
  await membre.save();

  return membre; // Retourne le membre mis à jour avec son nouveau rôle
};

// Exportation des fonctions
export default {
  assignRole,
  getAllMembers,
  getMemberById,
  getMemberRole,
  removeRoleFromMember,
  updateMemberRole, // Assurez-vous que cette fonction est bien exportée
};
