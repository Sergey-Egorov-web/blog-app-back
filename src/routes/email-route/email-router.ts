import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";
import { emailSendAddresses } from "../../constant";
import { emailsService } from "../../domains/emails-service";

export const emailRouter = Router({});

emailRouter.post("/send", async (req: Request, res: Response) => {
  const email = req.body.email;

  const result = await emailsService.sendEmail(email);

  if (!result) {
    res.status(500).send("Ошибка при отправке письма.");
  }
  res.sendStatus(200);
});
