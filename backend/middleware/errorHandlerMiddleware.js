const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req); // Si vous utilisez express-validator
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Erreur du serveur" });
};

// Exportation des deux éléments
export { errorHandler, handleValidationErrors };
