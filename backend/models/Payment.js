import mongoose from "mongoose";
const { model, Schema } = mongoose;

// Schéma du paiement
const paymentSchema = new Schema(
  {
    montant: {
      type: Number,
      required: [true, "Le montant est requis"],
      min: [0, "Le montant ne peut pas être inférieur à zéro"], // Validation pour garantir que le montant est positif
    },
    datePaiement: {
      type: Date,
      required: [true, "La date de paiement est requise"],
      default: Date.now, // Définit la date du paiement à la date actuelle si elle n'est pas précisée
    },
    membreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre", // Référence au modèle Membre pour lier un paiement à un membre spécifique
      required: [true, "L'ID du membre est requis"],
    },
    description: {
      type: String,
      maxlength: [500, "La description ne peut pas dépasser 500 caractères"], // Limitation de la longueur de la description
      default: "", // Valeur par défaut si aucune description n'est fournie
    },
  },
  { timestamps: true } // Ajout des timestamps pour createdAt et updatedAt automatiquement
);

// Middleware de validation (si nécessaire)
paymentSchema.pre("save", function (next) {
  if (this.montant < 0) {
    return next(new Error("Le montant ne peut pas être inférieur à zéro")); // Vérifie si le montant est positif avant d'enregistrer
  }
  next();
});

// Méthode statique pour récupérer les paiements d'un membre particulier
paymentSchema.statics.findByMember = function (memberId) {
  return this.find({ membreId: memberId }).exec(); // Recherche les paiements associés à un membre
};

// Export du modèle Payment
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
