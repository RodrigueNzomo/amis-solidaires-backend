// backend/models/Cotisation.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schéma de la cotisation
const CotisationSchema = new Schema(
  {
    membre: {
      type: Schema.Types.ObjectId,
      ref: "Membre",
      required: [true, "Le membre est requis"], // Message d'erreur personnalisé
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
    statut: {
      type: String,
      enum: ["payé", "en retard"],
      default: "payé",
    },
  },
  { timestamps: true } // Ajout des timestamps (createdAt, updatedAt)
);

// Méthode statique pour récupérer les cotisations par membre
CotisationSchema.statics.findByMembre = function (membreId) {
  return this.find({ membre: membreId });
};

// Middleware Mongoose pour vérifier les données avant la sauvegarde (exemple)
CotisationSchema.pre("save", function (next) {
  if (this.montant < 0) {
    return next(
      new Error("Le montant de la cotisation ne peut pas être négatif")
    );
  }
  next();
});

module.exports = mongoose.model("Cotisation", CotisationSchema);
