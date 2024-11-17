import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { validateCotisationData } from "../utils/validators.js"; // Importation correcte de la validation pour la cotisation

// Schéma de la cotisation
const CotisationSchema = new Schema(
  {
    membre: {
      type: Schema.Types.ObjectId,
      ref: "Membre", // Référence au modèle Membre pour lier la cotisation à un membre
      required: [true, "Le membre est requis"], // Validation obligatoire pour le membre
    },
    montant: {
      type: Number,
      required: [true, "Le montant est requis"], // Validation obligatoire pour le montant
      min: [0, "Le montant doit être positif"], // Validation pour garantir un montant positif
    },
    date: {
      type: Date,
      default: Date.now, // Définit la date actuelle par défaut
    },
    statut: {
      type: String,
      enum: ["payé", "en retard"], // L'état de la cotisation, avec une valeur par défaut "payé"
      default: "payé",
    },
  },
  { timestamps: true } // Ajout des champs createdAt et updatedAt automatiquement
);

// Méthode statique pour récupérer les cotisations par membre
CotisationSchema.statics.findByMembre = function (membreId) {
  return this.find({ membre: membreId }); // Recherche toutes les cotisations associées à un membre spécifique
};

// Middleware Mongoose avant sauvegarde pour valider les données
CotisationSchema.pre("save", async function (next) {
  try {
    await validateCotisationData(this); // Appliquer la validation des données avant de continuer avec la sauvegarde
    next();
  } catch (err) {
    next(err); // Si la validation échoue, arrêter la sauvegarde et renvoyer l'erreur
  }
});

// Exportation du modèle Cotisation
const Cotisation = mongoose.model("Cotisation", CotisationSchema);

export default Cotisation;
