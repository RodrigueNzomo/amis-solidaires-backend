// backend/middleware/errorHandler.js

const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  // Vérifie les erreurs de validation dans la requête
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Si des erreurs sont présentes, renvoyer une réponse avec un statut 400
    return res.status(400).json({
      message: "Données invalides",
      errors: errors.array(),
    });
  }
  next(); // Si aucune erreur, passer à la suite
};

// Gestion globale des erreurs serveur
const handleError = (err, req, res, next) => {
  console.error(err.message); // Affiche l'erreur dans la console pour débogage
  res.status(500).json({
    message: "Erreur serveur interne",
    error: err.message,
  });
};

module.exports = {
  handleValidationErrors,
  handleError,
};
