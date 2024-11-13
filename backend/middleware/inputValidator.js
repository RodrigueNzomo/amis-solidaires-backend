// backend/middleware/inputValidator.js
const { body, validationResult } = require("express-validator");

// Fonction générique pour la validation des erreurs
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Données invalides",
      errors: errors.array(),
    });
  }
  next(); // Si aucune erreur, passer au prochain middleware ou à la route
};

// Validation pour la création d'une aide
const validateAide = [
  body("beneficiaire")
    .isMongoId()
    .withMessage("Le bénéficiaire doit être un ID valide"),
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide"),
  body("description").notEmpty().withMessage("La description est requise"),
  handleValidationErrors,
];

// Validation pour la création et modification d'une cotisation
const validateCotisation = [
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide"),
  body("date").isDate().withMessage("La date doit être valide"),
  handleValidationErrors,
];

// Validation pour la création et modification d'un membre
const validateMembre = [
  body("email").isEmail().withMessage("L'email doit être valide"),
  body("name").notEmpty().withMessage("Le nom est requis"),
  body("dateOfBirth")
    .isDate()
    .withMessage("La date de naissance doit être valide"),
  handleValidationErrors,
];

// Validation pour la création et modification d'un prêt
const validatePret = [
  body("montant")
    .isNumeric()
    .withMessage("Le montant du prêt doit être un nombre valide"),
  body("dateDebut").isDate().withMessage("La date de début doit être valide"),
  body("dateFin").isDate().withMessage("La date de fin doit être valide"),
  handleValidationErrors,
];

// Validation pour la création et modification d'un paiement
const validatePayment = [
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide"),
  body("datePaiement")
    .isDate()
    .withMessage("La date de paiement doit être valide"),
  handleValidationErrors,
];

module.exports = {
  validateAide,
  validateCotisation,
  validateMembre,
  validatePret,
  validatePayment,
};
