// backend/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Afficher l'erreur dans la console pour le suivi
  console.error(err.stack);

  // Erreur de validation (par exemple, si un champ n'est pas valide)
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Erreur de validation des données",
      details: err.errors,
    });
  }

  // Erreur d'authentification (token invalide ou expiré)
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: "Accès non autorisé, veuillez vérifier votre token",
    });
  }

  // Erreur interne du serveur (erreur générique)
  return res.status(500).json({
    message: "Une erreur interne est survenue",
    error: err.message || err,
  });
};

module.exports = errorHandler;
