import { body } from "express-validator"; // Utilisation de express-validator

// Fonction de validation pour un champ requis
export const validateRequiredField = (field) => {
  return body(field).notEmpty().withMessage(`${field} est requis.`);
};

// Fonction de validation pour une date valide
export const validateDate = (field) => {
  return body(field)
    .isDate()
    .withMessage(`${field} doit être une date valide.`);
};

// Fonction de validation pour les données du membre
export const validateMembreData = body("nom")
  .isLength({ min: 2 })
  .withMessage("Le nom doit comporter au moins 2 caractères.")
  .trim();

// Fonction de validation pour les données de la cotisation
export const validateCotisationData = body("montant")
  .isFloat({ min: 0 })
  .withMessage("Le montant doit être un nombre positif.")
  .notEmpty()
  .withMessage("Le montant est requis.");

// Fonction de validation pour les données de l'utilisateur
export const validateUserData = [
  body("name")
    .isLength({ min: 3 })
    .withMessage("Le nom doit contenir au moins 3 caractères."),
  body("email")
    .isEmail()
    .withMessage("L'email doit être valide.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Le mot de passe doit comporter au moins 6 caractères.")
    .matches(/\d/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre.")
    .matches(/[a-zA-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une lettre."),
];

// Fonction de validation pour les données du prêt
export const validatePretData = [
  body("montant")
    .isFloat({ min: 1 })
    .withMessage("Le montant doit être supérieur ou égal à 1."),
  body("interet")
    .isFloat({ min: 0 })
    .withMessage("Le taux d'intérêt doit être positif."),
  body("duree")
    .isInt({ min: 1 })
    .withMessage("La durée doit être d'au moins 1 mois."),
  body("beneficiaire").notEmpty().withMessage("Le bénéficiaire est requis."),
  body("dateDebut")
    .isDate()
    .withMessage("La date de début doit être une date valide."),
];

// **Nouvelle fonction de validation pour les données de l'aide**
export const validateAideData = [
  body("beneficiaire")
    .notEmpty()
    .withMessage("Le bénéficiaire est requis.")
    .isMongoId()
    .withMessage("L'ID du bénéficiaire est invalide."),
  body("typeAide")
    .notEmpty()
    .withMessage("Le type d'aide est requis.")
    .isIn(["alimentaire", "financière", "éducation", "santé", "autre"])
    .withMessage("Le type d'aide doit être valide."),
  body("montant")
    .isFloat({ min: 0 })
    .withMessage("Le montant de l'aide doit être un nombre positif.")
    .notEmpty()
    .withMessage("Le montant est requis."),
  body("date").optional().isDate().withMessage("La date doit être valide."),
  body("description")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La description ne peut pas dépasser 500 caractères."),
];

// Ajoutez d'autres fonctions de validation selon les besoins...
// Validation des données de paiement
export const validatePaymentData = [
  body("montant")
    .isFloat({ min: 0 })
    .withMessage("Le montant doit être un nombre positif."),
  body("datePaiement")
    .isDate()
    .withMessage("La date de paiement doit être une date valide."),
  body("membreId")
    .notEmpty()
    .withMessage("L'ID du membre est requis.")
    .isMongoId()
    .withMessage("L'ID du membre doit être valide."),
];
