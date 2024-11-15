import mongoose from "mongoose";
const { Schema } = mongoose;

// Schéma du paiement
const paymentSchema = new Schema(
  {
    montant: {
      type: Number,
      required: [true, "Le montant est requis"],
      min: [0, "Le montant ne peut pas être inférieur à zéro"],
    },
    datePaiement: {
      type: Date,
      required: [true, "La date de paiement est requise"],
      default: Date.now, // Définit la date du paiement à la date actuelle si elle n'est pas précisée
    },
    membreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre", // Référence au modèle Membre
      required: [true, "L'ID du membre est requis"],
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
      default: "", // Valeur par défaut si aucune description n'est fournie
    },
  },
  { timestamps: true } // Ajouter les timestamps pour créer et modifier automatiquement les champs createdAt et updatedAt
);

// Middleware de validation (si nécessaire)
paymentSchema.pre("save", function (next) {
  if (this.montant < 0) {
    return next(new Error("Le montant ne peut pas être inférieur à zéro"));
  }
  next();
});

// Méthode statique pour récupérer les paiements d'un membre particulier
paymentSchema.statics.findByMember = function (memberId) {
  return this.find({ membreId: memberId }).exec(); // Ajout de `exec()` pour retourner une promesse directement
};

// Export du modèle Payment
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
