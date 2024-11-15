// backend/controllers/roleController.js
import { findById, find } from "../models/Membre.js";

// Méthode pour assigner un rôle à un membre
const assignRole = async (membreId, role) => {
  const validRoles = [
    "President",
    "Tresorier",
    "Commissaire aux comptes",
    "Censeur",
    "President Comité",
    "Membre",
  ];

  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  const membre = await findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour récupérer tous les membres
const getAllMembers = async () => {
  return await find();
};

// Méthode pour récupérer un membre par ID
const getMemberById = async (id) => {
  return await findById(id);
};

// Méthode pour récupérer le rôle d'un membre
const getMemberRole = async (id) => {
  const membre = await findById(id);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }
  return membre;
};

// Méthode pour mettre à jour le rôle d'un membre
const updateMemberRole = async (membreId, role) => {
  const validRoles = [
    "President",
    "Tresorier",
    "Commissaire aux comptes",
    "Censeur",
    "President Comité",
    "Membre",
  ];

  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  const membre = await findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour supprimer un rôle (réinitialiser à "Membre")
const removeRoleFromMember = async (membreId) => {
  const membre = await findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = "Membre";
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
