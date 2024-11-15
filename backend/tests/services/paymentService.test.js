// tests/services/paymentService.test.js
const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const paymentService = require("../../backend/services/paymentService.js");
const notificationService = require("../../backend/services/notificationService.js");

describe("Payment Service", () => {
  it("should process a payment and notify the user", async () => {
    const fakePayment = {
      userId: "userId123",
      amount: 100,
      status: "completed",
    };

    const sendNotificationStub = sinon
      .stub(notificationService, "sendNotification")
      .resolves();

    const result = await paymentService.processPayment("userId123", 100);

    expect(result.status).to.equal("payé"); // On suppose que le paiement devient payé
    expect(sendNotificationStub.calledOnce).to.be.true; // Vérifie que la notification a été envoyée

    sendNotificationStub.restore();
  });

  it("should throw an error if payment processing fails", async () => {
    const sendNotificationStub = sinon
      .stub(notificationService, "sendNotification")
      .rejects(new Error("Failed to send notification"));

    try {
      await paymentService.processPayment("userId123", 100);
    } catch (err) {
      expect(err.message).to.equal("Erreur lors du traitement du paiement");
    }

    sendNotificationStub.restore();
  });
});
