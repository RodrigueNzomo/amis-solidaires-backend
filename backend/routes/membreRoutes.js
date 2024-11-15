import Membre from "../models/Membre.js"; // Assurez-vous que le modèle Membre existe et est correctement importé

// Ajouter un membre
export const ajouterMembre = async (data) => {
  try {
    const membre = new Membre(data); // Créer une instance du membre avec les données
    await membre.save(); // Sauvegarder le membre dans la base de données
    return { success: true, message: "Membre ajouté avec succès", membre };
  } catch (err) {
    console.error("Erreur lors de l'ajout du membre:", err.message);
    throw new Error("Erreur du serveur lors de l'ajout du membre");
  }
};

// Récupérer tous les membres
export const getMembres = async () => {
  try {
    const membres = await Membre.find(); // Utiliser la méthode `find` sur le modèle Membre
    return { success: true, data: membres };
  } catch (err) {
    console.error("Erreur lors de la récupération des membres:", err.message);
    throw new Error("Erreur du serveur lors de la récupération des membres");
  }
};

// Modifier un membre
export const modifierMembre = async (id, data) => {
  try {
    const membre = await Membre.findByIdAndUpdate(id, data, { new: true }); // Utiliser la méthode `findByIdAndUpdate`
    if (!membre) {
      throw new Error("Membre non trouvé");
    }
    return { success: true, message: "Membre modifié avec succès", membre };
  } catch (err) {
    console.error("Erreur lors de la modification du membre:", err.message);
    throw new Error("Erreur du serveur lors de la modification du membre");
  }
};

// Supprimer un membre
export const supprimerMembre = async (id) => {
  try {
    const membre = await Membre.findByIdAndDelete(id); // Utiliser la méthode `findByIdAndDelete`
    if (!membre) {
      throw new Error("Membre non trouvé");
    }
    return { success: true, message: "Membre supprimé avec succès" };
  } catch (err) {
    console.error("Erreur lors de la suppression du membre:", err.message);
    throw new Error("Erreur du serveur lors de la suppression du membre");
  }
};
