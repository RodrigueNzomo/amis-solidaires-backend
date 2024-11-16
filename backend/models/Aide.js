import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { validateAideData } from "../utils/validators.js"; // Importation correcte de la validation

// Schéma de l'Aide
const AideSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre",
      required: [true, "Le bénéficiaire est requis"],
    },
    typeAide: {
      type: String,
      required: [true, "Le type d'aide est requis"],
      enum: ["alimentaire", "financière", "éducation", "santé", "autre"],
    },
    montant: {
      type: Number,
      required: [true, "Le montant est requis"],
      min: [0, "Le montant doit être positif"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
    },
  },
  { timestamps: true }
);

// Méthode statique pour rechercher des aides par bénéficiaire
AideSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId });
};

// Middleware de validation avant la sauvegarde de l'Aide
AideSchema.pre("save", async function (next) {
  try {
    // Validation des données de l'instance
    await validateAideData(this);
    next(); // Si la validation passe, continue avec la sauvegarde
  } catch (err) {
    // Si la validation échoue, renvoyer une erreur
    next(new Error(`Validation échouée : ${err.message}`));
  }
});

export default model("Aide", AideSchema);
