// backend/controllers/membreController.js

const Membre = require("../models/Membre");

// Ajouter un nouveau membre
const ajouterMembre = async (req, res) => {
  try {
    const membre = new Membre(req.body);
    await membre.save();
    res.status(201).json(membre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer tous les membres
const getMembres = async (req, res) => {
  try {
    const membres = await Membre.find();
    res.json(membres);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Modifier un membre
const modifierMembre = async (req, res) => {
  try {
    const membre = await Membre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!membre) {
      return res.status(404).send("Membre non trouvé");
    }
    res.json(membre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer un membre
const supprimerMembre = async (req, res) => {
  try {
    const membre = await Membre.findByIdAndDelete(req.params.id);
    if (!membre) {
      return res.status(404).send("Membre non trouvé");
    }
    res.json({ message: "Membre supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  ajouterMembre,
  getMembres,
  modifierMembre,
  supprimerMembre,
};
