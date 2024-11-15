// backend/controllers/pretController.js

import Pret, {
  find,
  findByIdAndUpdate,
  findByIdAndDelete,
} from "../models/Pret"; // Assurez-vous que le modèle est bien importé

// Ajouter un nouveau prêt
const ajouterPret = async (req, res) => {
  try {
    const { beneficiaire, montant, interet, duree } = req.body;
    if (!beneficiaire || !montant || !interet || !duree) {
      return res.status(400).json({ message: "Données du prêt manquantes." });
    }

    // Créer un nouveau prêt avec les données envoyées
    const pret = new Pret({
      beneficiaire,
      montant,
      interet,
      duree,
      statut: "actif", // Statut par défaut
    });

    // Sauvegarder le prêt dans la base de données
    await pret.save();

    // Retourner la réponse
    res.status(201).json({ message: "Prêt ajouté avec succès", pret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Récupérer tous les prêts
const getPrets = async (req, res) => {
  try {
    const prets = await find();
    res.status(200).json(prets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Modifier un prêt
const modifierPret = async (req, res) => {
  try {
    const pret = await findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pret) {
      return res.status(404).send("Prêt non trouvé");
    }
    res.status(200).json({ message: "Prêt modifié avec succès", pret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer un prêt
const supprimerPret = async (req, res) => {
  try {
    const pret = await findByIdAndDelete(req.params.id);
    if (!pret) {
      return res.status(404).send("Prêt non trouvé");
    }
    res.status(200).json({ message: "Prêt supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Assurez-vous que toutes les fonctions sont bien exportées
export default {
  ajouterPret,
  getPrets,
  modifierPret,
  supprimerPret,
};
