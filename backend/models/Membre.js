import mongoose from "mongoose";
const { model, Schema } = mongoose;
import { validateMembreData } from "../utils/validators.js"; // Importation correcte de la fonction de validation

// Schéma du membre
const MembreSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"],
      minlength: [2, "Le nom doit contenir au moins 2 caractères"],
      trim: true, // Retirer les espaces avant/après
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"],
      minlength: [2, "Le prénom doit contenir au moins 2 caractères"],
      trim: true, // Retirer les espaces avant/après
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true, // Assurer l'unicité de l'email
      match: [/\S+@\S+\.\S+/, "L'email doit être valide"], // Validation regex pour l'email
      trim: true, // Retirer les espaces avant/après
    },
    adresse: {
      type: String,
      required: [true, "L'adresse est requise"],
      maxlength: [500, "L'adresse ne peut pas dépasser 500 caractères"],
    },
    telephone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      match: [
        /^\d{10}$/,
        "Le numéro de téléphone doit être composé de 10 chiffres",
      ],
    },
    role: {
      type: String,
      enum: [
        "President",
        "Tresorier",
        "Commissaire aux comptes",
        "Censeur",
        "President Comité",
        "Membre",
      ],
      default: "Membre", // Valeur par défaut
    },
    cotisations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cotisation",
      },
    ],
  },
  { timestamps: true } // Ajout des timestamps pour createdAt et updatedAt
);

// Méthode statique pour récupérer les membres avec leurs cotisations
MembreSchema.statics.findWithCotisations = function () {
  return this.find().populate("cotisations"); // Remplissage des cotisations liées à chaque membre
};

// Middleware de validation avant la sauvegarde
MembreSchema.pre("save", function (next) {
  try {
    validateMembreData(this); // Validation de l'objet membre
    next(); // Si tout est valide, continuer avec la sauvegarde
  } catch (err) {
    next(err); // Si une erreur survient, elle est renvoyée
  }
});

// Exportation du modèle Membre
export default model("Membre", MembreSchema);
