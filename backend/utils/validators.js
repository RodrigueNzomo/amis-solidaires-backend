import { body } from "express-validator"; // Utilisation pour des validations génériques

export const validateRequiredField = (field) => {
  return body(field).notEmpty().withMessage(`${field} est requis.`);
};

export const validateDate = (field) => {
  return body(field)
    .isDate()
    .withMessage(`${field} doit être une date valide.`);
};
