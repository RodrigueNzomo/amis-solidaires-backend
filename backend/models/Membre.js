// backend/models/Membre.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schéma du membre
const MembreSchema = new Schema(
  {
    nom: {
      type: String,
      required: [true, "Le nom est requis"], // Message d'erreur personnalisé
      minlength: [2, "Le nom doit contenir au moins 2 caractères"], // Validation pour la longueur
    },
    prenom: {
      type: String,
      required: [true, "Le prénom est requis"], // Message d'erreur personnalisé
      minlength: [2, "Le prénom doit contenir au moins 2 caractères"], // Validation pour la longueur
    },
    email: {
      type: String,
      required: [true, "L'email est requis"], // Message d'erreur personnalisé
      unique: true, // Assurer que l'email est unique
      match: [/\S+@\S+\.\S+/, "L'email doit être valide"], // Validation d'email avec une expression régulière
    },
    adresse: {
      type: String,
      required: [true, "L'adresse est requise"], // Message d'erreur personnalisé
      maxlength: [500, "L'adresse ne peut pas dépasser 500 caractères"], // Limite de caractères pour l'adresse
    },
    telephone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"], // Message d'erreur personnalisé
      match: [
        /^\d{10}$/,
        "Le numéro de téléphone doit être composé de 10 chiffres",
      ], // Validation pour le format du téléphone
    },
    cotisations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Cotisation",
      },
    ],
  },
  { timestamps: true } // Ajout des timestamps (createdAt, updatedAt)
);

// Méthode statique pour récupérer les membres avec leurs cotisations
MembreSchema.statics.findWithCotisations = function () {
  return this.find().populate("cotisations");
};

// Middleware de validation avant la sauvegarde
MembreSchema.pre("save", function (next) {
  if (!this.email) {
    return next(new Error("L'email est obligatoire"));
  }
  next();
});

module.exports = mongoose.model("Membre", MembreSchema);
