import { body } from "express-validator"; // Utilisation de express-validator pour les validations

export const validateEmail = body("email")
  .isEmail()
  .withMessage("L'email fourni est invalide.")
  .normalizeEmail();

export const validatePassword = body("password")
  .isLength({ min: 6 })
  .withMessage("Le mot de passe doit comporter au moins 6 caractères.")
  .matches(/\d/)
  .withMessage("Le mot de passe doit contenir au moins un chiffre.")
  .matches(/[a-zA-Z]/)
  .withMessage("Le mot de passe doit contenir au moins une lettre.");
