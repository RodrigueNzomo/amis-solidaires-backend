// backend/controllers/paymentController.js

const Payment = require("../models/Payment");

// Ajouter un nouveau paiement
const ajouterPaiement = async (req, res) => {
  try {
    // Vérification que les données nécessaires sont présentes dans le corps de la requête
    const { montant, datePaiement } = req.body;
    if (!montant || !datePaiement) {
      return res
        .status(400)
        .json({ message: "Le montant et la date de paiement sont requis." });
    }

    // Créer une instance du paiement avec les données reçues
    const paiement = new Payment(req.body);

    // Sauvegarder le paiement dans la base de données
    await paiement.save();
    res.status(201).json({ message: "Paiement ajouté avec succès", paiement });
  } catch (err) {
    console.error("Erreur lors de l'ajout du paiement:", err.message);
    res.status(500).json({
      message: "Erreur du serveur lors de l'ajout du paiement",
      error: err.message,
    });
  }
};

// Récupérer tous les paiements
const getPayments = async (req, res) => {
  try {
    const paiements = await Payment.find();
    if (!paiements.length) {
      return res.status(404).json({ message: "Aucun paiement trouvé" });
    }
    res.json(paiements);
  } catch (err) {
    console.error("Erreur lors de la récupération des paiements:", err.message);
    res.status(500).json({
      message: "Erreur du serveur lors de la récupération des paiements",
      error: err.message,
    });
  }
};

// Modifier un paiement
const modifierPaiement = async (req, res) => {
  try {
    // Vérifier si le paiement existe et l'actualiser
    const paiement = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    // Retourner les détails du paiement modifié
    res.json({ message: "Paiement modifié avec succès", paiement });
  } catch (err) {
    console.error("Erreur lors de la modification du paiement:", err.message);
    res.status(500).json({
      message: "Erreur du serveur lors de la modification du paiement",
      error: err.message,
    });
  }
};

// Supprimer un paiement
const supprimerPaiement = async (req, res) => {
  try {
    const paiement = await Payment.findByIdAndDelete(req.params.id);
    if (!paiement) {
      return res.status(404).json({ message: "Paiement non trouvé" });
    }

    res.json({ message: "Paiement supprimé avec succès" });
  } catch (err) {
    console.error("Erreur lors de la suppression du paiement:", err.message);
    res.status(500).json({
      message: "Erreur du serveur lors de la suppression du paiement",
      error: err.message,
    });
  }
};

module.exports = {
  ajouterPaiement,
  getPayments,
  modifierPaiement,
  supprimerPaiement,
};
