// backend/services/emailService.js

import { createTransport } from "nodemailer";

// Configuration du transporteur pour Nodemailer (utilisation de Gmail ici comme exemple)
const transporter = createTransport({
  service: "gmail", // Utilisation de Gmail pour envoyer des emails
  auth: {
    user: process.env.EMAIL_USER, // Doit être défini dans les variables d'environnement
    pass: process.env.EMAIL_PASS, // Doit être défini dans les variables d'environnement
  },
});

// Fonction pour envoyer un email
const sendEmail = async (to, subject, text, html = "") => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // L'email d'expéditeur
    to: to, // L'email du destinataire
    subject: subject, // L'objet de l'email
    text: text, // Le contenu en texte brut
    html: html, // Le contenu en HTML (optionnel)
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé : " + info.response);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email : " + error.message);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
};

export default {
  sendEmail,
};
