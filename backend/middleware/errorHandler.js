const { validationResult } = require("express-validator");

// Middleware de validation des données
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

// Middleware de gestion des erreurs serveur
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Affiche l'erreur dans la console pour débogage
  res.status(500).json({
    message: "Erreur serveur interne",
    error: err.message,
  });
};

module.exports = {
  handleValidationErrors,
  errorHandler, // Renommé ici pour être plus cohérent
};
