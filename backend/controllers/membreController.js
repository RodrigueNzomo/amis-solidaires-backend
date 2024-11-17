import Membre from "../models/Membre.js"; // Import du modèle Membre

// Ajouter un membre
export const ajouterMembre = async (data) => {
  try {
    const membre = new Membre(data); // Créer une instance du membre avec les données
    await membre.save(); // Sauvegarder le membre dans la base de données
    return membre;
  } catch (err) {
    console.error(`Erreur lors de l'ajout du membre: ${err.message}`);
    throw new Error("Impossible d'ajouter le membre, erreur du serveur");
  }
};

// Récupérer tous les membres
export const getMembres = async () => {
  try {
    const membres = await Membre.find(); // Utiliser la méthode `find` sur le modèle Membre
    return membres;
  } catch (err) {
    console.error(`Erreur lors de la récupération des membres: ${err.message}`);
    throw new Error("Impossible de récupérer les membres, erreur du serveur");
  }
};

// Modifier un membre
export const modifierMembre = async (id, data) => {
  try {
    const membre = await Membre.findByIdAndUpdate(id, data, { new: true }); // Mise à jour du membre avec l'id donné
    if (!membre) {
      throw new Error(`Membre avec l'ID ${id} non trouvé`);
    }
    return membre;
  } catch (err) {
    console.error(
      `Erreur lors de la modification du membre ${id}: ${err.message}`
    );
    throw new Error("Impossible de modifier le membre, erreur du serveur");
  }
};

// Supprimer un membre
export const supprimerMembre = async (id) => {
  try {
    const membre = await Membre.findByIdAndDelete(id); // Supprimer le membre avec l'id donné
    if (!membre) {
      throw new Error(`Membre avec l'ID ${id} non trouvé`);
    }
    return membre;
  } catch (err) {
    console.error(
      `Erreur lors de la suppression du membre ${id}: ${err.message}`
    );
    throw new Error("Impossible de supprimer le membre, erreur du serveur");
  }
};
