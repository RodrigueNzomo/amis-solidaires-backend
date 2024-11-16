// backend/controllers/roleController.js
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

// Fonction utilitaire pour vérifier si un membre existe
const findMembreById = async (id) => {
  const membre = await Membre.findById(id);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }
  return membre;
};

// Méthode pour assigner un rôle à un membre
const assignRole = async (membreId, role) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide");
  }

  const membre = await findMembreById(membreId);
  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour récupérer tous les membres
const getAllMembers = async () => {
  return await Membre.find(); // Utilisation de Membre.find() directement
};

// Méthode pour récupérer un membre par ID
const getMemberById = async (id) => {
  return await findMembreById(id);
};

// Méthode pour récupérer le rôle d'un membre
const getMemberRole = async (id) => {
  const membre = await findMembreById(id);
  return membre.role; // Retourne directement le rôle du membre
};

// Méthode pour mettre à jour le rôle d'un membre
const updateMemberRole = async (membreId, role) => {
  if (!isValidRole(role)) {
    throw new Error("Rôle invalide");
  }

  const membre = await findMembreById(membreId);
  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour supprimer un rôle (réinitialiser à "Membre")
const removeRoleFromMember = async (membreId) => {
  const membre = await findMembreById(membreId);
  membre.role = "Membre"; // Réinitialise le rôle
  await membre.save();
  return membre;
};

export default {
  assignRole,
  getAllMembers,
  getMemberById,
  getMemberRole,
  updateMemberRole,
  removeRoleFromMember,
};
