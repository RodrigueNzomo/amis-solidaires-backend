// tests/controllers/cotisationController.test.js
const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { expect } = chai;
const app = require("../../backend/app"); // Assure-toi que ce chemin est correct
const Cotisation = require("../../backend/models/Cotisation");

const userId = "userId123"; // ID utilisateur fictif pour l'authentification

describe("Cotisation Controller", () => {
  describe("POST /api/cotisations", () => {
    it("should create a new cotisation", async () => {
      const fakeCotisation = {
        membre: userId,
        montant: 1000,
        statut: "payé",
      };

      // Mock de la méthode save de Mongoose
      const createCotisationStub = sinon
        .stub(Cotisation.prototype, "save")
        .resolves(fakeCotisation);

      const res = await request(app)
        .post("/api/cotisations/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`) // Authentification fictive
        .send(fakeCotisation);

      expect(res.status).to.equal(201); // Statut OK pour création
      expect(res.body).to.include(fakeCotisation); // Vérifier que l'objet créé est retourné

      createCotisationStub.restore(); // Restauration de la méthode originale
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/cotisations/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send({}); // Envoi d'une requête vide

      expect(res.status).to.equal(400); // Vérification du statut d'erreur
      expect(res.body.message).to.equal("Données invalides"); // Message d'erreur
    });
  });

  describe("GET /api/cotisations", () => {
    it("should return all cotisations", async () => {
      const fakeCotisations = [
        { membre: userId, montant: 1000, statut: "payé" },
        { membre: userId, montant: 500, statut: "en retard" },
      ];

      const findCotisationsStub = sinon
        .stub(Cotisation, "find")
        .resolves(fakeCotisations);

      const res = await request(app)
        .get("/api/cotisations")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200); // Vérification que la réponse est correcte
      expect(res.body).to.deep.equal(fakeCotisations); // Vérification que les cotisations retournées sont correctes

      findCotisationsStub.restore(); // Restauration de la méthode originale
    });
  });
});
