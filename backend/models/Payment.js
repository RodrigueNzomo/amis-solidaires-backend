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
    },
    membreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre", // Référence au modèle Membre
      required: [true, "L'ID du membre est requis"],
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"],
      default: "",
    },
  },
  { timestamps: true } // Ajouter les timestamps pour créer et modifier automatiquement les champs createdAt et updatedAt
);

// Middleware de validation (si nécessaire)
paymentSchema.pre("save", function (next) {
  // Vous pouvez ajouter une validation supplémentaire ou un traitement avant la sauvegarde
  // Exemple: valider que le montant n'est pas négatif ou vérifier des conditions supplémentaires
  if (this.montant < 0) {
    return next(new Error("Le montant ne peut pas être inférieur à zéro"));
  }
  next();
});

// Méthodes statiques et instance (si nécessaire)
// Exemple: méthode pour récupérer les paiements d'un membre particulier
paymentSchema.statics.findByMember = function (memberId) {
  return this.find({ membreId: memberId });
};

// Export du modèle Payment
export default mongoose.model("Payment", paymentSchema);
