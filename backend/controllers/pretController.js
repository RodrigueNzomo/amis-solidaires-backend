import Pret from "../models/Pret.js"; // Import du modèle Pret

// Ajouter un nouveau prêt
const ajouterPret = async (pretData) => {
  const { beneficiaire, montant, interet, duree } = pretData;
  if (!beneficiaire || !montant || !interet || !duree) {
    throw new Error("Données du prêt manquantes.");
  }

  try {
    const pret = new Pret({
      beneficiaire,
      montant,
      interet,
      duree,
      statut: "actif", // Statut par défaut
    });

    await pret.save();
    return pret; // Retourner l'objet prêt ajouté
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de l'ajout du prêt");
  }
};

// Récupérer tous les prêts
const getPrets = async () => {
  try {
    const prets = await Pret.find();
    return prets; // Retourner les prêts récupérés
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la récupération des prêts");
  }
};

// Modifier un prêt
const modifierPret = async (id, pretData) => {
  try {
    const pret = await Pret.findByIdAndUpdate(id, pretData, { new: true });
    if (!pret) {
      throw new Error("Prêt non trouvé");
    }
    return pret; // Retourner le prêt modifié
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la modification du prêt");
  }
};

// Supprimer un prêt
const supprimerPret = async (id) => {
  try {
    const pret = await Pret.findByIdAndDelete(id);
    if (!pret) {
      throw new Error("Prêt non trouvé");
    }
    return pret; // Retourner le prêt supprimé
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la suppression du prêt");
  }
};

// Exporter les fonctions
export { ajouterPret, getPrets, modifierPret, supprimerPret };
