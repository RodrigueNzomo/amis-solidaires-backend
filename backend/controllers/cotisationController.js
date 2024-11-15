// backend/controllers/cotisationController.js

import Cotisation, {
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Cotisation";

// Ajouter une cotisation
const ajouterCotisation = async (data) => {
  try {
    const cotisation = new Cotisation(data);
    await cotisation.save();
    return cotisation;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Récupérer toutes les cotisations
const getCotisations = async () => {
  try {
    const cotisations = await find();
    return cotisations;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Modifier une cotisation
const modifierCotisation = async (id, data) => {
  try {
    const cotisation = await findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!cotisation) {
      throw new Error("Cotisation non trouvée");
    }
    return cotisation;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Supprimer une cotisation
const supprimerCotisation = async (id) => {
  try {
    const cotisation = await findByIdAndDelete(id);
    if (!cotisation) {
      throw new Error("Cotisation non trouvée");
    }
    return cotisation;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

export default {
  ajouterCotisation,
  getCotisations,
  modifierCotisation,
  supprimerCotisation,
};
