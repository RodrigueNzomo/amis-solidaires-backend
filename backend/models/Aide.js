import mongoose from "mongoose";
const { model, Schema } = mongoose;
import { validateAideData } from "../utils/validators.js"; // Importation correcte de la validation

// Schéma de l'Aide
const AideSchema = new Schema(
  {
    beneficiaire: {
      type: Schema.Types.ObjectId,
      ref: "Membre", // Référence à l'entité Membre
      required: [true, "Le bénéficiaire est requis"], // Validation obligatoire du bénéficiaire
    },
    typeAide: {
      type: String,
      required: [true, "Le type d'aide est requis"],
      enum: ["alimentaire", "financière", "éducation", "santé", "autre"], // Enumération des types d'aides possibles
    },
    montant: {
      type: Number,
      required: [true, "Le montant est requis"],
      min: [0, "Le montant doit être positif"], // Validation pour que le montant soit positif
    },
    date: {
      type: Date,
      default: Date.now, // Définit la date actuelle par défaut si non fournie
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"], // Validation de la longueur de la description
    },
  },
  { timestamps: true } // Ajout des champs createdAt et updatedAt automatiquement
);

// Méthode statique pour rechercher des aides par bénéficiaire
AideSchema.statics.findByBeneficiaire = function (beneficiaireId) {
  return this.find({ beneficiaire: beneficiaireId }); // Recherche toutes les aides associées à un bénéficiaire spécifique
};

// Middleware de validation avant la sauvegarde de l'Aide
AideSchema.pre("save", async function (next) {
  try {
    // Validation des données de l'instance
    await validateAideData(this); // Appel à la fonction de validation externe
    next(); // Si la validation passe, continue avec la sauvegarde
  } catch (err) {
    // Si la validation échoue, renvoyer une erreur
    next(new Error(`Validation échouée : ${err.message}`));
  }
});

// Exportation du modèle Aide
export default model("Aide", AideSchema);
