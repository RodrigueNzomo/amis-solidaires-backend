// tests/routes/cotisationRoutes.test.js
const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { expect } = chai;
const app = require("../../backend/app");
const Cotisation = require("../../backend/models/Cotisation");

describe("Cotisation Routes", () => {
  describe("POST /api/cotisations", () => {
    it("should create a new cotisation", async () => {
      const fakeCotisation = {
        membre: "userId123",
        montant: 1000,
        statut: "payé",
      };

      const createCotisationStub = sinon
        .stub(Cotisation.prototype, "save")
        .resolves(fakeCotisation);

      const res = await request(app)
        .post("/api/cotisations/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send(fakeCotisation);

      expect(res.status).to.equal(201);
      expect(res.body).to.include(fakeCotisation);

      createCotisationStub.restore();
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/cotisations/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send({});

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Données invalides");
    });
  });

  describe("GET /api/cotisations", () => {
    it("should return all cotisations", async () => {
      const fakeCotisations = [
        { membre: "userId123", montant: 1000, statut: "payé" },
        { membre: "userId124", montant: 500, statut: "en retard" },
      ];

      const findCotisationsStub = sinon
        .stub(Cotisation, "find")
        .resolves(fakeCotisations);

      const res = await request(app)
        .get("/api/cotisations")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(fakeCotisations);

      findCotisationsStub.restore();
    });
  });
});
