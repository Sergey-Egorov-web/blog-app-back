import { Request, Response, Router } from "express";
import nodemailer from "nodemailer";

export const emailRouter = Router({});

emailRouter.post("/send", async (req: Request, res: Response) => {
  const login = "serg-dcdeveloper@yandex.ru";

  const transporter = nodemailer.createTransport({
    // service: "yandex",
    host: "smtp.yandex.ru",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: login,
      pass: process.env.YA_RU_PASS,
    },
  });

  const mailOptions = {
    from: login,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: "<b>Это тестовое письмо, отправленное через Nodemailer.</b>",
  };

  console.log("Попытка отправки письма:", mailOptions);

  try {
    // Отправка письма
    const info = await transporter.sendMail(mailOptions);
    console.log("Письмо успешно отправлено:", info.response);

    // Успешный ответ
    res.send({
      email: req.body.email,
      message: req.body.message,
      subject: req.body.subject,
    });
  } catch (error) {
    // Обработка ошибки
    console.error("Ошибка при отправке письма:", error);
    res.status(500).send("Ошибка при отправке письма.");
  }
});

// let info = await transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("Ошибка при отправке письма:", error);
//     res.sendStatus(400);
//   } else {
//     console.log("Письмо успешно отправлено:", info.response);
//     res.send({
//       email: req.body.email,
//       message: req.body.message,
//       subject: req.body.subject,
//     });
//   }
// });
