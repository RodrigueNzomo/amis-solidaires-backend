// backend/routes/aideRoutes.js

const express = require("express");
const Aide = require("../models/Aide");
const authMiddleware = require("../middleware/authMiddleware");
const { validateAide } = require("../middleware/inputValidator"); // Import de la validation
const aideController = require("../controllers/aideController"); // Import du contrôleur pour Aide

const router = express.Router();

// Ajouter une aide (route protégée par l'authentification et la validation des données)
router.post("/", authMiddleware, validateAide, aideController.createAide);

// Récupérer toutes les aides (route protégée par l'authentification)
router.get("/", authMiddleware, aideController.getAllAides);

module.exports = router;
