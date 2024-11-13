// backend/controllers/pretController.js

const Pret = require("../models/Pret");

// Ajouter un nouveau prêt
const ajouterPret = async (req, res) => {
  try {
    const pret = new Pret(req.body);
    await pret.save();
    res.status(201).json(pret);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer tous les prêts
const getPrets = async (req, res) => {
  try {
    const prets = await Pret.find();
    res.json(prets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Modifier un prêt
const modifierPret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pret) {
      return res.status(404).send("Prêt non trouvé");
    }
    res.json(pret);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer un prêt
const supprimerPret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndDelete(req.params.id);
    if (!pret) {
      return res.status(404).send("Prêt non trouvé");
    }
    res.json({ message: "Prêt supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  ajouterPret,
  getPrets,
  modifierPret,
  supprimerPret,
};
