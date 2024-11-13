// backend/routes/userRoutes.js

const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Récupérer les détails d'un utilisateur (route protégée par l'authentification)
router.get("/:id", authMiddleware, userController.getUserDetails);

// Récupérer tous les utilisateurs (route protégée par l'authentification)
router.get("/", authMiddleware, userController.getAllUsers);

module.exports = router;
