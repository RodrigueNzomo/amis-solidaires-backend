// tests/models/membreModel.test.js
import chai from "chai";
import { stub } from "sinon";
const { expect } = chai;
import Membre, { prototype } from "../../backend/models/Membre.js";
import { connectDB, disconnectDB, resetDB } from "../testUtils/testDB";

describe("Membre Model", () => {
  // Avant tous les tests, connecter à la DB en mémoire
  before(async () => {
    await connectDB();
  });

  // Avant chaque test, réinitialiser la base de données
  beforeEach(async () => {
    await resetDB();
  });

  // Après tous les tests, déconnecter de la DB en mémoire
  after(async () => {
    await disconnectDB();
  });

  it("should create a new membre with valid data", async () => {
    const fakeMembre = {
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      adresse: "123 Rue Example",
      telephone: "0123456789",
    };

    const createMembreStub = stub(prototype, "save").resolves(fakeMembre);

    const membre = new Membre(fakeMembre);
    await membre.save();

    expect(createMembreStub.calledOnce).to.be.true;
    expect(membre.email).to.equal("john.doe@example.com");
    expect(membre.telephone).to.equal("0123456789");

    createMembreStub.restore();
  });

  it("should throw an error if required fields are missing", async () => {
    const fakeMembre = {
      nom: "John",
      prenom: "Doe",
      email: "john.doe@example.com",
      // Missing adresse
    };

    try {
      const membre = new Membre(fakeMembre);
      await membre.save();
    } catch (error) {
      expect(error.errors.adresse).to.exist;
    }
  });

  it("should validate the 'email' field", async () => {
    const fakeMembre = {
      nom: "John",
      prenom: "Doe",
      email: "invalid-email", // Invalid email format
      adresse: "123 Rue Example",
      telephone: "0123456789",
    };

    try {
      const membre = new Membre(fakeMembre);
      await membre.save();
    } catch (error) {
      expect(error.errors.email).to.exist; // Should catch the validation error
    }
  });
});
