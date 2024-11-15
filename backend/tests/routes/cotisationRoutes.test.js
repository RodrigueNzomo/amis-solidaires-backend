// tests/routes/cotisationRoutes.test.js
import chai from "chai";
import { stub } from "sinon";
import request from "supertest";
const { expect } = chai;
import app from "../../backend/app";
import Cotisation, { prototype } from "../../backend/models/Cotisation";

describe("Cotisation Routes", () => {
  describe("POST /api/cotisations", () => {
    it("should create a new cotisation", async () => {
      const fakeCotisation = {
        membre: "userId123",
        montant: 1000,
        statut: "payé",
      };

      const createCotisationStub = stub(prototype, "save").resolves(
        fakeCotisation
      );

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

      const findCotisationsStub = stub(Cotisation, "find").resolves(
        fakeCotisations
      );

      const res = await request(app)
        .get("/api/cotisations")
        .set("Authorization", `Bearer fake-jwt-token`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal(fakeCotisations);

      findCotisationsStub.restore();
    });
  });
});
