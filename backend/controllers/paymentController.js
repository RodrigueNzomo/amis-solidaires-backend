// backend/controllers/paymentController.js
import Payment from "../models/Payment.js";

// Ajouter un paiement
const ajouterPaiement = async (data) => {
  try {
    const paiement = new Payment(data);
    await paiement.save();
    return paiement;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de l'ajout du paiement");
  }
};

// Récupérer tous les paiements
const getPaiements = async () => {
  try {
    const paiements = await Payment.find();
    return paiements;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la récupération des paiements");
  }
};

// Modifier un paiement
const modifierPaiement = async (id, data) => {
  try {
    const paiement = await Payment.findByIdAndUpdate(id, data, { new: true });
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
const supprimerPaiement = async (id) => {
  try {
    const paiement = await Payment.findByIdAndDelete(id);
    if (!paiement) {
      throw new Error("Paiement non trouvé");
    }
    return paiement;
  } catch (err) {
    console.error(err.message);
    throw new Error("Erreur du serveur lors de la suppression du paiement");
  }
};

export default {
  ajouterPaiement,
  getPaiements,
  modifierPaiement,
  supprimerPaiement,
};
