const mongoose = require("mongoose");
const { Schema } = mongoose;
const { validateAideData } = require("../utils/validators"); // Importer la fonction de validation externe

// Schéma de l'Aide
const AideSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre",
      required: [true, "Le bénéficiaire est requis"], // Message d'erreur personnalisé
    },
    typeAide: {
      type: String,
      required: [true, "Le type d'aide est requis"], // Message d'erreur personnalisé
      enum: ["alimentaire", "financière", "éducation", "santé", "autre"], // Enumération pour limiter les valeurs possibles
    },
    montant: {
      type: Number,
      required: [true, "Le montant est requis"], // Message d'erreur personnalisé
      min: [0, "Le montant doit être positif"], // Validation pour garantir un montant positif
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"], // Limite de caractères
    },
  },
  { timestamps: true } // Ajout des timestamps (createdAt, updatedAt)
);

// Méthode statique pour rechercher des aides par bénéficiaire
AideSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId });
};

module.exports = mongoose.model("Aide", AideSchema);
