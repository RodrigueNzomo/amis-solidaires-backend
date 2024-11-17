import Payment from "../models/Payment.js"; // Import du modèle Payment

// Ajouter un paiement
export const ajouterPaiement = async (data) => {
  try {
    const paiement = new Payment(data); // Créer une nouvelle instance de Payment avec les données
    await paiement.save(); // Sauvegarder le paiement dans la base de données
    return paiement;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de l'ajout du paiement");
  }
};

// Récupérer tous les paiements
export const getPaiements = async () => {
  try {
    const paiements = await Payment.find(); // Utiliser la méthode `find` sur le modèle Payment
    return paiements;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la récupération des paiements");
  }
};

// Modifier un paiement
export const modifierPaiement = async (id, data) => {
  try {
    const paiement = await Payment.findByIdAndUpdate(id, data, { new: true }); // Mise à jour du paiement avec l'id donné
    if (!paiement) {
      throw new Error("Paiement non trouvé");
    }
    return paiement;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la modification du paiement");
  }
};

// Supprimer un paiement
export const supprimerPaiement = async (id) => {
  try {
    const paiement = await Payment.findByIdAndDelete(id); // Supprimer le paiement avec l'id donné
    if (!paiement) {
      throw new Error("Paiement non trouvé");
    }
    return paiement;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la suppression du paiement");
  }
};
