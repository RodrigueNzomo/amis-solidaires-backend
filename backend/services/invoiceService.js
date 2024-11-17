// backend/services/invoiceService.js

import PDFDocument from "pdfkit"; // Utilisation de PDFKit pour générer des fichiers PDF
import fs from "fs"; // Pour manipuler les fichiers du système
import { sendEmail } from "./emailService.js"; // Utilisation du service email pour envoyer la facture par email

// Fonction pour générer une facture PDF
const generateInvoice = (payment) => {
  const doc = new PDFDocument();

  const filePath = `./invoices/invoice_${payment._id}.pdf`; // Chemin du fichier PDF à générer
  doc.pipe(fs.createWriteStream(filePath)); // Enregistrer la facture en local

  // Création du contenu de la facture
  doc.fontSize(20).text("Facture de Paiement", { align: "center" });

  doc.fontSize(16).text(`ID de Paiement: ${payment._id}`, { align: "left" });
  doc.text(`Date de Paiement: ${payment.datePaiement}`, { align: "left" });
  doc.text(`Montant: ${payment.montant} EUR`, { align: "left" });
  doc.text(`Membre ID: ${payment.membreId}`, { align: "left" });
  doc.text(`Description: ${payment.description}`, { align: "left" });

  // Finalisation du document PDF
  doc.end();

  return filePath; // Retourner le chemin de la facture générée
};

// Fonction pour envoyer la facture par email à l'utilisateur
const sendInvoiceByEmail = async (payment, email) => {
  const invoicePath = generateInvoice(payment); // Générer la facture
  const subject = "Votre Facture de Paiement";
  const text = `Bonjour,\n\nVeuillez trouver ci-joint votre facture pour le paiement effectué.`;
  const html = `<p>Bonjour,</p><p>Veuillez trouver ci-joint votre facture pour le paiement effectué.</p>`;

  try {
    await sendEmail(email, subject, text, html);
    console.log("Facture envoyée par email à " + email);
    return { success: true, message: "Facture envoyée avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de la facture:", error);
    throw new Error("Erreur lors de l'envoi de la facture");
  }
};

export { generateInvoice, sendInvoiceByEmail };
