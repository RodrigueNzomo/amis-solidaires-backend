// tests/services/notificationService.test.js
const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;
const notificationService = require("../../backend/services/notificationService");
const emailService = require("../../backend/services/emailService");

describe("Notification Service", () => {
  it("should send a notification", async () => {
    const sendEmailStub = sinon
      .stub(emailService, "sendEmail")
      .resolves("Email sent");

    const result = await notificationService.sendNotification(
      "test@example.com",
      "Test Notification",
      "This is a test notification"
    );

    expect(sendEmailStub.calledOnce).to.be.true;
    expect(result).to.be.undefined; // No return expected

    sendEmailStub.restore();
  });

  it("should handle errors during notification sending", async () => {
    const sendEmailStub = sinon
      .stub(emailService, "sendEmail")
      .rejects(new Error("Failed to send email"));

    try {
      await notificationService.sendNotification(
        "test@example.com",
        "Test Notification",
        "This is a test notification"
      );
    } catch (err) {
      expect(err.message).to.equal("Erreur lors de l'envoi de la notification");
    }

    sendEmailStub.restore();
  });
});
