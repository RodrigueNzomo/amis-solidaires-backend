import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
import _default from "../utils/validators.js";
const { validateCotisationData } = _default; // Import de la validation pour la cotisation

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

// Middleware Mongoose avant sauvegarde pour valider les données
CotisationSchema.pre("save", function (next) {
  try {
    // Appliquer la validation des données avant de continuer avec la sauvegarde
    validateCotisationData(this);
    next();
  } catch (err) {
    next(err); // Si la validation échoue, arrêter la sauvegarde et renvoyer l'erreur
  }
});

export default model("Cotisation", CotisationSchema);
