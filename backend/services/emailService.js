// backend/services/emailService.js

import nodemailer from "nodemailer";

// Configuration du transporteur pour l'envoi des emails
const transporter = nodemailer.createTransport({
  service: "gmail", // Utilisation de Gmail pour l'exemple, à modifier selon votre fournisseur
  auth: {
    user: process.env.EMAIL_USER, // L'adresse email de l'expéditeur (doit être dans le fichier .env)
    pass: process.env.EMAIL_PASS, // Le mot de passe ou le token pour l'authentification
  },
});

// Fonction pour envoyer un email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // L'expéditeur de l'email
      to, // Destinataire
      subject, // Sujet
      text, // Contenu en texte brut
      html, // Contenu HTML (si nécessaire)
    });

    console.log("Message envoyé: %s", info.messageId);
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error("Erreur lors de l'envoi de l'email");
  }
};

export { sendEmail };
