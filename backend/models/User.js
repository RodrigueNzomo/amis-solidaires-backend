import mongoose from "mongoose";
const { model, Schema } = mongoose;

import { compare, genSalt, hash } from "bcryptjs";

import { validateUserData } from "../utils/validators.js"; // Importation correcte de la fonction de validation

// Schéma de l'utilisateur
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      minlength: [3, "Le nom doit contenir au moins 3 caractères"], // Validation pour garantir une longueur minimale
    },
    email: {
      type: String,
      required: [true, "L'email est requis"],
      unique: true, // Assurer l'unicité de l'email
      match: [/\S+@\S+\.\S+/, "L'email doit être valide"], // Validation regex pour l'email
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"], // Validation pour garantir un mot de passe sécurisé
    },
  },
  { timestamps: true }
);

// Méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = function (enteredPassword) {
  return compare(enteredPassword, this.password); // Retour direct de la promesse
};

// Pré-enregistrement pour hasher le mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  // Si le mot de passe n'est pas modifié, on passe à l'étape suivante
  if (!this.isModified("password")) {
    return next();
  }
  // Génération du sel pour hasher le mot de passe
  const salt = await genSalt(10);
  // Hachage du mot de passe
  this.password = await hash(this.password, salt);
  next();
});

// Méthode statique pour récupérer un utilisateur par email
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Middleware de validation avant la sauvegarde
userSchema.pre("save", function (next) {
  try {
    validateUserData(this); // Validation externe des données de l'utilisateur
    next(); // Si tout est valide, on continue avec la sauvegarde
  } catch (err) {
    next(err); // Si une erreur survient, elle est renvoyée
  }
});

// Exportation du modèle User
const User = mongoose.model("User", userSchema);

export default User;
