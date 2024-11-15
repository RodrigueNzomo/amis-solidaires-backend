// backend/controllers/aideController.js

import Aide, { find } from "../models/Aide.js";

// Créer une nouvelle aide
const createAide = async (data) => {
  try {
    const aide = new Aide(data); // Crée une nouvelle instance d'Aide avec les données passées
    await aide.save();
    return aide;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Récupérer toutes les aides
const getAllAides = async () => {
  try {
    const aides = await find().populate("beneficiaire");
    return aides;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

export default { createAide, getAllAides };
