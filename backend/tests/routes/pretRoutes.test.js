// tests/routes/pretRoutes.test.js
const chai = require("chai");
const sinon = require("sinon");
const request = require("supertest");
const { expect } = chai;
const app = require("../../backend/app");
const Pret = require("../../backend/models/Pret");

describe("Pret Routes", () => {
  describe("POST /api/prets", () => {
    it("should create a new pret", async () => {
      const fakePret = {
        beneficiaire: "userId123",
        montant: 5000,
        interet: 5,
        duree: 12,
        statut: "actif",
      };

      const createPretStub = sinon
        .stub(Pret.prototype, "save")
        .resolves(fakePret);

      const res = await request(app)
        .post("/api/prets/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send(fakePret);

      expect(res.status).to.equal(201);
      expect(res.body).to.include(fakePret);

      createPretStub.restore();
    });

    it("should return 400 if required fields are missing", async () => {
      const res = await request(app)
        .post("/api/prets/ajouter")
        .set("Authorization", `Bearer fake-jwt-token`)
        .send({});

      expect(res.status).to.equal(400);
      expect(res.body.message).to.equal("Données invalides");
    });
  });

  describe("GET /api/prets", () => {
    it("should return all prets", async () => {
      const fakePrets = [
        { beneficiaire: "userId123", montant: 5000, statut: "actif" },
        { beneficiaire: "userId124", montant: 2000, statut: "remboursé" },
      ];

      const findPretsStub = sinon.stub(Pret, "find").resolves(fakePrets);

      const res = await request(app)
        .get("/api/prets")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(fakePrets);

      findPretsStub.restore();
    });
  });
});
