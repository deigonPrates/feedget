import { SubmitFeedbackUseCase } from "./submit-feedback-use-cases";

const createFeedbackSpy = jest.fn();
const createSendMailSpay = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: createSendMailSpay }
);

describe("Submit Feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "BUG no teste unitario",
        screenshot: "data:",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(createSendMailSpay).toHaveBeenCalled();
  });

  it("should not be able to send feedback without the type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "BUG no teste unitario",
        screenshot: "data:",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send feedback without the comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:",
      })
    ).rejects.toThrow();
  });

  it("should not be able to send feedback invalid image", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "BUG no teste unitario",
        screenshot: "1111:",
      })
    ).rejects.toThrow();
  });
});
