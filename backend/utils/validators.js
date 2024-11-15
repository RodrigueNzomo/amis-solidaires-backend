import { body, param, validationResult } from "express-validator";

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

// Validation générique pour le nombre
const isValidNumber = (fieldName) => {
  return body(fieldName)
    .isNumeric()
    .withMessage(`${fieldName} doit être un nombre valide.`)
    .isFloat({ min: 0 })
    .withMessage(`${fieldName} doit être supérieur ou égal à zéro.`);
};

// Validation générique pour l'email
const validateEmail = body("email")
  .isEmail()
  .withMessage("L'email fourni est invalide.")
  .normalizeEmail();

// Validation générique pour le mot de passe
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
      "Le type d'aide doit être parmi : alimentaire, financière, éducation, santé, autre."
    )
    .notEmpty()
    .withMessage("Le type d'aide est requis."),
  isValidNumber("montant"),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La description ne peut pas dépasser 500 caractères."),
];

// **Validation pour la Cotisation**
const validateCotisationData = [
  isValidNumber("montant"),
  body("date")
    .isDate()
    .withMessage("La date de la cotisation doit être une date valide.")
    .notEmpty()
    .withMessage("La date de la cotisation est obligatoire."),
];

// **Validation pour le Membre**
const validateMembreData = [
  validateEmail,
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
];

// **Validation pour le Paiement**
const validatePaymentData = [
  isValidNumber("montant"),
  body("datePaiement")
    .isDate()
    .withMessage("La date de paiement doit être une date valide.")
    .notEmpty()
    .withMessage("La date du paiement est requise."),
];

// **Validation pour un ID générique (utilisé dans plusieurs routes)**
const validateIdParam = [
  param("id")
    .isMongoId()
    .withMessage("L'ID fourni est invalide.")
    .notEmpty()
    .withMessage("L'ID est requis."),
];

export {
  handleValidationErrors,
  validateEmail,
  validatePassword,
  validateAideData,
  validateCotisationData,
  validateMembreData,
  validatePaymentData,
  validateIdParam,
};
