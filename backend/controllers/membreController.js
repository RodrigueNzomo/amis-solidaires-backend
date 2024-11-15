// backend/controllers/membreController.js

import Membre, {
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Membre";

// Ajouter un membre
const ajouterMembre = async (data) => {
  // Ne pas inclure req, res
  try {
    const membre = new Membre(data);
    await membre.save();
    return membre;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Récupérer tous les membres
const getMembres = async () => {
  try {
    const membres = await find();
    return membres;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Modifier un membre
const modifierMembre = async (id, data) => {
  // Utilisation de id et data
  try {
    const membre = await findByIdAndUpdate(id, data, { new: true });
    if (!membre) {
      throw new Error("Membre non trouvé");
    }
    return membre;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Supprimer un membre
const supprimerMembre = async (id) => {
  // Utilisation de l'id seulement
  try {
    const membre = await findByIdAndDelete(id);
    if (!membre) {
      throw new Error("Membre non trouvé");
    }
    return membre;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

export default {
  ajouterMembre,
  getMembres,
  modifierMembre,
  supprimerMembre,
};
