// backend/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

// Schéma de l'utilisateur
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"], // Message d'erreur personnalisé
      minlength: [3, "Le nom doit contenir au moins 3 caractères"], // Validation pour la longueur du nom
    },
    email: {
      type: String,
      required: [true, "L'email est requis"], // Message d'erreur personnalisé
      unique: true, // Email unique dans la base de données
      match: [/\S+@\S+\.\S+/, "L'email doit être valide"], // Validation de l'email avec une expression régulière
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est requis"], // Message d'erreur personnalisé
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"], // Validation pour la longueur du mot de passe
    },
  },
  { timestamps: true } // Ajout des timestamps (createdAt, updatedAt)
);

// Méthode pour vérifier le mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pré-enregistrement pour hasher le mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  // Si le mot de passe n'est pas modifié, on passe à l'étape suivante
  if (!this.isModified("password")) {
    next();
  }
  // Génération du sel pour hasher le mot de passe
  const salt = await bcrypt.genSalt(10);
  // Hachage du mot de passe
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode statique pour récupérer un utilisateur par email (utile pour l'authentification)
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

module.exports = mongoose.model("User", userSchema);
