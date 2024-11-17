import Aide from "../models/Aide.js"; // Importation du modèle Aide

// Créer une nouvelle aide
const createAide = async (data) => {
  try {
    const aide = new Aide(data); // Création d'une nouvelle instance d'Aide
    await aide.save(); // Sauvegarde dans la base de données
    return aide; // Retourne l'objet aide créé
  } catch (err) {
    console.error("Erreur lors de la création de l'aide: ", err.message);
    throw new Error("Erreur du serveur lors de la création de l'aide");
  }
};

// Récupérer toutes les aides
const getAllAides = async () => {
  try {
    const aides = await Aide.find().populate("beneficiaire"); // Utilisation de populate pour inclure les informations du bénéficiaire
    return aides;
  } catch (err) {
    console.error("Erreur lors de la récupération des aides: ", err.message);
    throw new Error("Erreur du serveur lors de la récupération des aides");
  }
};

// Récupérer une aide par ID
const getAideById = async (id) => {
  try {
    const aide = await Aide.findById(id).populate("beneficiaire");
    if (!aide) throw new Error("Aide non trouvée");
    return aide;
  } catch (err) {
    console.error(
      "Erreur lors de la récupération de l'aide par ID: ",
      err.message
    );
    throw new Error(
      "Erreur du serveur lors de la récupération de l'aide par ID"
    );
  }
};

// Mettre à jour une aide
const updateAide = async (id, data) => {
  try {
    const aide = await Aide.findByIdAndUpdate(id, data, { new: true });
    if (!aide) throw new Error("Aide non trouvée");
    return aide;
  } catch (err) {
    console.error("Erreur lors de la mise à jour de l'aide: ", err.message);
    throw new Error("Erreur du serveur lors de la mise à jour de l'aide");
  }
};

// Supprimer une aide
const deleteAide = async (id) => {
  try {
    const aide = await Aide.findByIdAndDelete(id);
    if (!aide) throw new Error("Aide non trouvée");
    return aide;
  } catch (err) {
    console.error("Erreur lors de la suppression de l'aide: ", err.message);
    throw new Error("Erreur du serveur lors de la suppression de l'aide");
  }
};

// Exportation des méthodes pour les utiliser dans les routes
export { createAide, getAllAides, getAideById, updateAide, deleteAide };
