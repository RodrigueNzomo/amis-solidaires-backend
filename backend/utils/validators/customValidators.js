import { body } from "express-validator"; // Validation spécifique pour des entités

export const validateCotisationAmount = body("montant")
  .isFloat({ min: 0 })
  .withMessage("Le montant doit être un nombre positif.");
