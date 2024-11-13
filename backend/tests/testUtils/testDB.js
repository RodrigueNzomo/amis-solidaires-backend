// tests/testUtils/testDB.js
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Crée une instance de MongoMemoryServer pour la base de données en mémoire
let mongoServer;

const connectDB = async () => {
  mongoServer = await MongoMemoryServer.create(); // Démarre un serveur MongoDB en mémoire
  const uri = mongoServer.getUri(); // Récupère l'URI de la base de données en mémoire
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB connected for testing");
};

const disconnectDB = async () => {
  await mongoose.disconnect(); // Déconnecte Mongoose
  await mongoServer.stop(); // Arrête le serveur MongoDB en mémoire
  console.log("MongoDB disconnected after tests");
};

// Pour réinitialiser la base de données avant chaque test
const resetDB = async () => {
  await mongoose.connection.dropDatabase(); // Supprime toutes les collections de la base de données
  console.log("Database reset");
};

module.exports = { connectDB, disconnectDB, resetDB };
