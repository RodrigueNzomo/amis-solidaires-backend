// Middleware pour gérer les erreurs
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Affichage de l'erreur dans la console pour le débogage
  res.status(500).json({ message: err.message || "Erreur du serveur" }); // Retourne une réponse d'erreur générique
};

export default errorHandler; // Exportation du middleware pour l'utiliser dans l'application
