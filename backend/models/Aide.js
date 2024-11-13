// backend/models/Aide.js
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { validate } = require("../utils/validators"); // Utilisation de la fonction de validation générique si besoin

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

// Utilisation de méthodes statiques pour les fonctions courantes, comme la recherche d'aide par bénéficiaire
AideSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId });
};

// Validations supplémentaires ou méthodes de transformation si nécessaire
AideSchema.methods.validateData = function () {
  // Exemple de méthode pour valider ou transformer les données avant de les enregistrer
  if (this.montant < 0) {
    throw new Error("Le montant de l'aide ne peut pas être négatif");
  }
};

// Middleware Mongoose pour les actions avant ou après la sauvegarde
AideSchema.pre("save", function (next) {
  // Exemple : Ajouter des logiques de validation avant d'enregistrer
  if (!this.typeAide) {
    throw new Error("Le type d'aide est obligatoire");
  }
  next();
});

module.exports = mongoose.model("Aide", AideSchema);
