// backend/controllers/paymentController.js

const Payment = require("../models/Payment");

// Ajouter un nouveau paiement
const ajouterPaiement = async (req, res) => {
  try {
    const paiement = new Payment(req.body);
    await paiement.save();
    res.status(201).json(paiement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer tous les paiements
const getPayments = async (req, res) => {
  try {
    const paiements = await Payment.find();
    res.json(paiements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Modifier un paiement
const modifierPaiement = async (req, res) => {
  try {
    const paiement = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!paiement) {
      return res.status(404).send("Paiement non trouvé");
    }
    res.json(paiement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer un paiement
const supprimerPaiement = async (req, res) => {
  try {
    const paiement = await Payment.findByIdAndDelete(req.params.id);
    if (!paiement) {
      return res.status(404).send("Paiement non trouvé");
    }
    res.json({ message: "Paiement supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  ajouterPaiement,
  getPayments,
  modifierPaiement,
  supprimerPaiement,
};
