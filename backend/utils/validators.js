const { body, param, validationResult } = require("express-validator");

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

// **Validation des données utilisateur**
const validateEmail = body("email")
  .isEmail()
  .withMessage("L'email fourni est invalide.")
  .normalizeEmail();

const validatePassword = body("password")
  .isLength({ min: 6 })
  .withMessage("Le mot de passe doit comporter au moins 6 caractères.")
  .matches(/\d/)
  .withMessage("Le mot de passe doit contenir au moins un chiffre.")
  .matches(/[a-zA-Z]/)
  .withMessage("Le mot de passe doit contenir au moins une lettre.");

// **Validation des données pour l'Aide**
const validateAideData = [
  body("beneficiaire")
    .isMongoId()
    .withMessage("Le bénéficiaire doit être un ID valide.")
    .notEmpty()
    .withMessage("Le bénéficiaire est requis."),
  body("typeAide")
    .isIn(["alimentaire", "financière", "éducation", "santé", "autre"])
    .withMessage(
      "Le type d'aide doit être l'un des suivants : alimentaire, financière, éducation, santé, autre."
    )
    .notEmpty()
    .withMessage("Le type d'aide est requis."),
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide.")
    .isFloat({ min: 0 })
    .withMessage("Le montant doit être supérieur ou égal à zéro."),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La description ne peut pas dépasser 500 caractères."),
  handleValidationErrors,
];

// **Validation pour la Cotisation**
const validateCotisationData = [
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide.")
    .isFloat({ min: 0 })
    .withMessage("Le montant de la cotisation doit être positif."),
  body("date")
    .isDate()
    .withMessage("La date de la cotisation doit être une date valide.")
    .notEmpty()
    .withMessage("La date de la cotisation est obligatoire."),
  handleValidationErrors,
];

// **Validation pour le Membre**
const validateMembreData = [
  body("email")
    .isEmail()
    .withMessage("L'email doit être un email valide.")
    .normalizeEmail(),
  body("name")
    .notEmpty()
    .withMessage("Le nom du membre est requis.")
    .isLength({ min: 2 })
    .withMessage("Le nom doit comporter au moins 2 caractères."),
  body("dateOfBirth")
    .isDate()
    .withMessage("La date de naissance doit être valide.")
    .notEmpty()
    .withMessage("La date de naissance est requise."),
  handleValidationErrors,
];

// **Validation pour le Paiement**
const validatePaymentData = [
  body("montant")
    .isNumeric()
    .withMessage("Le montant doit être un nombre valide.")
    .isFloat({ min: 0 })
    .withMessage("Le montant du paiement doit être supérieur ou égal à zéro."),
  body("datePaiement")
    .isDate()
    .withMessage("La date de paiement doit être une date valide.")
    .notEmpty()
    .withMessage("La date du paiement est requise."),
  handleValidationErrors,
];

// **Validation pour un ID générique (utilisé dans plusieurs routes)**
const validateIdParam = [
  param("id")
    .isMongoId()
    .withMessage("L'ID fourni est invalide.")
    .notEmpty()
    .withMessage("L'ID est requis."),
  handleValidationErrors,
];

module.exports = {
  validateEmail,
  validatePassword,
  validateAideData,
  validateCotisationData,
  validateMembreData,
  validatePaymentData,
  validateIdParam,
};
