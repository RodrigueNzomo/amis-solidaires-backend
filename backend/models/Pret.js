// backend/models/Pret.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schéma du prêt
const PretSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre",
      required: [true, "Le bénéficiaire est requis"], // Message d'erreur personnalisé
    },
    montant: {
      type: Number,
      required: [true, "Le montant du prêt est requis"], // Message d'erreur personnalisé
      min: [0, "Le montant doit être positif"], // Validation pour garantir un montant positif
    },
    interet: {
      type: Number,
      required: [true, "Le taux d'intérêt est requis"], // Message d'erreur personnalisé
      min: [0, "Le taux d'intérêt doit être positif"], // Validation pour garantir un taux d'intérêt positif
    },
    duree: {
      type: Number,
      required: [true, "La durée du prêt est requise"], // Message d'erreur personnalisé
      min: [1, "La durée doit être d'au moins 1 mois"], // Validation pour garantir une durée minimale
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
  { timestamps: true } // Ajout des timestamps (createdAt, updatedAt)
);

// Méthode statique pour récupérer les prêts par bénéficiaire
PretSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId });
};

// Middleware Mongoose pour vérifier les données avant la sauvegarde (exemple)
PretSchema.pre("save", function (next) {
  if (this.montant < 0 || this.interet < 0 || this.duree < 1) {
    return next(
      new Error("Les valeurs du prêt doivent être positives et valides")
    );
  }
  next();
});

module.exports = mongoose.model("Pret", PretSchema);
