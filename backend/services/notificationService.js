// backend/services/notificationService.js

// Fonction pour envoyer une notification par email (pour simplification)
const sendNotification = async (to, subject, message) => {
  try {
    // Utilisation du service email pour envoyer une notification par email
    // On peut étendre ce service pour gérer d'autres types de notifications
    const emailService = require("./emailService");
    const text = `Notification: ${message}`;
    await emailService.sendEmail(to, subject, text);
    console.log(`Notification envoyée à ${to}`);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de la notification : " + error.message
    );
    throw new Error("Erreur lors de l'envoi de la notification");
  }
};

module.exports = {
  sendNotification,
};
