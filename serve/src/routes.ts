import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbackRepositories } from "./repositories/prisma/prisma-feedback-repositories";
import express from "express";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-cases";
export const routes = express.Router();

routes.post("/feedback", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const submitFeedbackUseCases = new SubmitFeedbackUseCase(
    new PrismaFeedbackRepositories(),
    new NodemailerMailAdapter()
  );

  submitFeedbackUseCases.execute({
    type,
    comment,
    screenshot,
  });

  res.status(201).send();
});
