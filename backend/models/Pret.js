import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { validatePretData } from "../utils/validators.js"; // Validation des données pour les prêts

// Schéma du prêt
const PretSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre", // Référence au modèle Membre
      required: [true, "Le bénéficiaire est requis"], // Validation pour garantir que le bénéficiaire est spécifié
    },
    montant: {
      type: Number,
      required: [true, "Le montant du prêt est requis"],
      min: [0, "Le montant doit être positif"], // Validation pour garantir un montant positif
    },
    interet: {
      type: Number,
      required: [true, "Le taux d'intérêt est requis"],
      min: [0, "Le taux d'intérêt doit être positif"], // Validation pour garantir un taux d'intérêt positif
    },
    duree: {
      type: Number,
      required: [true, "La durée du prêt est requise"],
      min: [1, "La durée doit être d'au moins 1 mois"], // Validation pour garantir que la durée est positive
    },
    dateDebut: {
      type: Date,
      default: Date.now, // Définit la date de début par défaut à la date actuelle
    },
    statut: {
      type: String,
      enum: ["actif", "remboursé"], // Validation pour s'assurer que le statut est valide
      default: "actif", // Valeur par défaut
    },
  },
  { timestamps: true } // Ajout des champs createdAt et updatedAt automatiquement
);

// Méthode statique pour récupérer les prêts par bénéficiaire
PretSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId }); // Recherche des prêts associés à un bénéficiaire spécifique
};

// Middleware de validation avant la sauvegarde
PretSchema.pre("save", async function (next) {
  try {
    await validatePretData(this); // Appliquer la validation des données avant la sauvegarde
    next(); // Si la validation passe, continuer avec la sauvegarde
  } catch (err) {
    next(err); // Si la validation échoue, arrêter et renvoyer l'erreur
  }
});

// Création du modèle
const Pret = mongoose.model("Pret", PretSchema);

export default Pret;
