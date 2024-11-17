// backend/services/notificationService.js
import { sendEmail } from "./emailService.js"; // Utilisation du service email pour envoyer des notifications

// Fonction pour envoyer une notification à un utilisateur
const sendNotification = async (userEmail, notificationMessage) => {
  const subject = "Notification importante";
  const text = notificationMessage;
  const html = `<p>${notificationMessage}</p>`; // HTML formaté pour l'email

  try {
    const emailResult = await sendEmail(userEmail, subject, text, html);
    return { success: true, message: "Notification envoyée avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification:", error);
    throw new Error("Erreur lors de l'envoi de la notification");
  }
};

export { sendNotification };
