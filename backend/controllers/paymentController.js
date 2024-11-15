// backend/controllers/paymentController.js

import Payment, {
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Payment";

// Ajouter un nouveau paiement
const ajouterPaiement = async (data) => {
  // Accepter des données comme argument
  try {
    // Vérification que les données nécessaires sont présentes
    const { montant, datePaiement } = data;
    if (!montant || !datePaiement) {
      throw new Error("Le montant et la date de paiement sont requis.");
    }

    // Créer une instance du paiement avec les données reçues
    const paiement = new Payment(data);

    // Sauvegarder le paiement dans la base de données
    await paiement.save();
    return paiement;
  } catch (err) {
    console.error("Erreur lors de l'ajout du paiement:", err.message);
    throw new Error("Erreur du serveur lors de l'ajout du paiement");
  }
};

// Récupérer tous les paiements
const getPayments = async () => {
  try {
    const paiements = await find();
    if (!paiements.length) {
      throw new Error("Aucun paiement trouvé");
    }
    return paiements;
  } catch (err) {
    console.error("Erreur lors de la récupération des paiements:", err.message);
    throw new Error("Erreur du serveur lors de la récupération des paiements");
  }
};

// Modifier un paiement
const modifierPaiement = async (id, data) => {
  // Utiliser id et data comme arguments
  try {
    // Vérifier si le paiement existe et l'actualiser
    const paiement = await findByIdAndUpdate(id, data, { new: true });
    if (!paiement) {
      throw new Error("Paiement non trouvé");
    }
    return paiement;
  } catch (err) {
    console.error("Erreur lors de la modification du paiement:", err.message);
    throw new Error("Erreur du serveur lors de la modification du paiement");
  }
};

// Supprimer un paiement
const supprimerPaiement = async (id) => {
  // Utiliser seulement l'id
  try {
    const paiement = await findByIdAndDelete(id);
    if (!paiement) {
      throw new Error("Paiement non trouvé");
    }
    return paiement;
  } catch (err) {
    console.error("Erreur lors de la suppression du paiement:", err.message);
    throw new Error("Erreur du serveur lors de la suppression du paiement");
  }
};

export default {
  ajouterPaiement,
  getPayments,
  modifierPaiement,
  supprimerPaiement,
};
