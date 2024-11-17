// backend/services/paymentService.js

import Payment from "../models/Payment.js"; // Import du modèle Payment
import { sendInvoiceByEmail } from "./invoiceService.js"; // Import du service de facturation

// Ajouter un paiement et envoyer une facture
const ajouterPaiement = async (data) => {
  try {
    const paiement = new Payment(data); // Créer une nouvelle instance de paiement
    await paiement.save(); // Sauvegarder le paiement dans la base de données

    // Envoi de la facture par email au membre
    await sendInvoiceByEmail(paiement, data.email); // Supposons que l'email de l'utilisateur est passé dans les données

    return paiement; // Retourner le paiement ajouté
  } catch (err) {
    console.error("Erreur lors de l'ajout du paiement:", err.message);
    throw new Error("Erreur du serveur lors de l'ajout du paiement");
  }
};

// Récupérer tous les paiements
const getPaiements = async () => {
  try {
    const paiements = await Payment.find(); // Utiliser la méthode `find` sur le modèle Payment
    return paiements; // Retourner les paiements
  } catch (err) {
    console.error("Erreur lors de la récupération des paiements:", err.message);
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

    // Envoi de la facture par email au membre après modification
    await sendInvoiceByEmail(paiement, data.email);

    return paiement;
  } catch (err) {
    console.error("Erreur lors de la modification du paiement:", err.message);
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
    console.error("Erreur lors de la suppression du paiement:", err.message);
    throw new Error("Erreur du serveur lors de la suppression du paiement");
  }
};

export { ajouterPaiement, getPaiements, modifierPaiement, supprimerPaiement };
