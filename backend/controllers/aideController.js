// backend/controllers/aideController.js

import Aide from "../models/Aide.js"; // Importation du modèle Aide

// Créer une nouvelle aide
const createAide = async (data) => {
  try {
    const aide = new Aide(data); // Crée une nouvelle instance d'Aide avec les données passées
    await aide.save();
    return aide;
  } catch (err) {
    console.error("Erreur lors de la création de l'aide: ", err.message);
    if (err.name === "ValidationError") {
      throw new Error("Données invalides pour l'aide");
    }
    throw new Error("Erreur du serveur lors de la création de l'aide");
  }
};

// Récupérer toutes les aides
const getAllAides = async () => {
  try {
    // Utilisation de Aide.find() directement pour récupérer les aides
    const aides = await Aide.find().populate("beneficiaire");
    return aides;
  } catch (err) {
    console.error("Erreur lors de la récupération des aides: ", err.message);
    if (err.name === "CastError") {
      throw new Error("Erreur de type lors de la récupération des aides");
    }
    throw new Error("Erreur du serveur lors de la récupération des aides");
  }
};

export { createAide, getAllAides };
