import { body } from "express-validator"; // Validation générique des données

export const validateName = body("name")
  .isLength({ min: 2 })
  .withMessage("Le nom doit comporter au moins 2 caractères.")
  .trim();

export const validatePhoneNumber = body("phone")
  .isLength({ min: 10, max: 10 })
  .withMessage("Le numéro de téléphone doit comporter 10 chiffres.")
  .isNumeric()
  .withMessage("Le numéro de téléphone doit être un nombre valide.");
