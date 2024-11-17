import Cotisation from "../models/Cotisation.js"; // Import du modèle Cotisation

// Ajouter une cotisation
export const ajouterCotisation = async (data) => {
  try {
    const cotisation = new Cotisation(data); // Créer une nouvelle cotisation avec les données
    await cotisation.save(); // Sauvegarder la cotisation dans la base de données
    return cotisation; // Retourner la cotisation ajoutée
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Récupérer toutes les cotisations
export const getCotisations = async () => {
  try {
    const cotisations = await Cotisation.find(); // Utiliser la méthode `find` pour récupérer toutes les cotisations
    return cotisations; // Retourner toutes les cotisations
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Modifier une cotisation
export const modifierCotisation = async (id, data) => {
  try {
    const cotisation = await Cotisation.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!cotisation) {
      throw new Error("Cotisation non trouvée");
    }
    return cotisation; // Retourner la cotisation modifiée
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};

// Supprimer une cotisation
export const supprimerCotisation = async (id) => {
  try {
    const cotisation = await Cotisation.findByIdAndDelete(id);
    if (!cotisation) {
      throw new Error("Cotisation non trouvée");
    }
    return cotisation; // Retourner la cotisation supprimée
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur");
  }
};
