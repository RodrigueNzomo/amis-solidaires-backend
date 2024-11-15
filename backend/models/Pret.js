import mongoose from "mongoose";
const { Schema } = mongoose;
import { validatePretData } from "../utils/validators.js"; // Import de la validation des données pour les prêts

// Schéma du prêt
const PretSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre",
      required: [true, "Le bénéficiaire est requis"],
    },
    montant: {
      type: Number,
      required: [true, "Le montant du prêt est requis"],
      min: [0, "Le montant doit être positif"],
    },
    interet: {
      type: Number,
      required: [true, "Le taux d'intérêt est requis"],
      min: [0, "Le taux d'intérêt doit être positif"],
    },
    duree: {
      type: Number,
      required: [true, "La durée du prêt est requise"],
      min: [1, "La durée doit être d'au moins 1 mois"],
    },
    dateDebut: {
      type: Date,
      default: Date.now,
    },
    statut: {
      type: String,
      enum: ["actif", "remboursé"],
      default: "actif",
    },
  },
  { timestamps: true }
);

// Méthode statique pour récupérer les prêts par bénéficiaire
PretSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId });
};

// Middleware de validation avant la sauvegarde
PretSchema.pre("save", function (next) {
  // Validation externe pour le prêt
  try {
    validatePretData(this); // Validation des données du prêt
    next(); // Continuer avec la sauvegarde si tout est valide
  } catch (err) {
    next(err); // Arrêter le processus si une erreur survient
  }
});

// Création du modèle
const Pret = mongoose.model("Pret", PretSchema);

export default Pret;
