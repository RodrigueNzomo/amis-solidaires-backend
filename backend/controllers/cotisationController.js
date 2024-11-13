// backend/controllers/cotisationController.js

const Cotisation = require("../models/Cotisation");

// Ajouter une nouvelle cotisation
const ajouterCotisation = async (req, res) => {
  try {
    const cotisation = new Cotisation(req.body);
    await cotisation.save();
    res.status(201).json(cotisation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer toutes les cotisations
const getCotisations = async (req, res) => {
  try {
    const cotisations = await Cotisation.find();
    res.json(cotisations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Modifier une cotisation
const modifierCotisation = async (req, res) => {
  try {
    const cotisation = await Cotisation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!cotisation) {
      return res.status(404).send("Cotisation non trouvée");
    }
    res.json(cotisation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer une cotisation
const supprimerCotisation = async (req, res) => {
  try {
    const cotisation = await Cotisation.findByIdAndDelete(req.params.id);
    if (!cotisation) {
      return res.status(404).send("Cotisation non trouvée");
    }
    res.json({ message: "Cotisation supprimée avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  ajouterCotisation,
  getCotisations,
  modifierCotisation,
  supprimerCotisation,
};
