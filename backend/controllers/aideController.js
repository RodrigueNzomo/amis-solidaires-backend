// backend/controllers/aideController.js
import Aide from "../models/Aide.js";

export const createAide = async (data) => {
  try {
    const aide = new Aide(data);
    await aide.save();
    return aide;
  } catch (err) {
    console.error("Erreur lors de la création de l'aide:", err.message);
    throw new Error("Erreur du serveur lors de la création de l'aide");
  }
};

export const getAllAides = async () => {
  try {
    const aides = await Aide.find().populate("beneficiaire");
    return aides;
  } catch (err) {
    console.error("Erreur lors de la récupération des aides:", err.message);
    throw new Error("Erreur du serveur lors de la récupération des aides");
  }
};
