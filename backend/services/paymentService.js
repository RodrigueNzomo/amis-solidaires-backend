// backend/services/paymentService.js

import Payment from "../models/Payment"; // Exemple de modèle de paiement
import { sendNotification } from "./notificationService.js"; // Notification service pour notifier après paiement

// Fonction pour traiter un paiement
const processPayment = async (userId, amount) => {
  try {
    // Créer un paiement dans la base de données (simulation d'un paiement)
    const payment = new Payment({
      userId,
      amount,
      status: "en cours", // Initialisation du statut à "en cours"
    });

    await payment.save();

    // Simulation du traitement du paiement (cela pourrait être un appel à un service externe de paiement)
    setTimeout(async () => {
      payment.status = "payé"; // Mise à jour du statut du paiement
      await payment.save();

      // Envoi de notification après le paiement
      await sendNotification(
        userId,
        "Confirmation de paiement",
        "Votre paiement a été confirmé."
      );
      console.log("Le paiement a été confirmé et la notification envoyée");
    }, 2000); // Simulation d'un délai pour traiter le paiement

    return payment;
  } catch (error) {
    console.error("Erreur lors du traitement du paiement : " + error.message);
    throw new Error("Erreur lors du traitement du paiement");
  }
};

export default {
  processPayment,
};
