const Membre = require("../models/Membre");

// Méthode pour assigner un rôle à un membre
const assignRole = async (membreId, role) => {
  // Vérifier que le rôle est valide
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

  // Chercher le membre par son ID
  const membre = await Membre.findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  // Modifier le rôle du membre
  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour récupérer tous les membres
const getAllMembers = async () => {
  return await Membre.find();
};

// Méthode pour récupérer un membre par ID
const getMemberById = async (id) => {
  return await Membre.findById(id);
};

// Méthode pour récupérer le rôle d'un membre
const getMemberRole = async (id) => {
  const membre = await Membre.findById(id);
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

  const membre = await Membre.findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  membre.role = role;
  await membre.save();
  return membre;
};

// Méthode pour supprimer un rôle (réinitialiser à "Membre")
const removeRoleFromMember = async (membreId) => {
  const membre = await Membre.findById(membreId);
  if (!membre) {
    throw new Error("Membre non trouvé");
  }

  // Réinitialisation du rôle
  membre.role = "Membre";
  await membre.save();
  return membre;
};

module.exports = {
  assignRole,
  getAllMembers,
  getMemberById,
  getMemberRole,
  updateMemberRole,
  removeRoleFromMember,
};
