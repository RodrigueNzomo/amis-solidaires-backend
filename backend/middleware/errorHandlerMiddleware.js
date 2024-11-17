import { validationResult } from "express-validator"; // Assurez-vous que express-validator est installé

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); // Si vous utilisez express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware pour gérer les erreurs globales
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Affichage de l'erreur dans la console pour le débogage
  res.status(500).json({ message: err.message || "Erreur du serveur" }); // Retourne une réponse d'erreur générique
};

// Exportation des deux éléments
export { errorHandler, handleValidationErrors };
