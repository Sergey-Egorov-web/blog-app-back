import { emailSendAddresses } from "../constant";
import nodemailer from "nodemailer";
import { UserDbType } from "../types/types";

export const emailsService = {
  async sendEmail(email: string): Promise<boolean> {
    const transporter = createTransporter();

    const mailOptions = createMailOptions(
      email,
      "testEmail",
      "test email",
      "<b>Это тестовое письмо, отправленное через Nodemailer.</b>"
    );

    console.log("Попытка отправки письма:", mailOptions);

    try {
      // Отправка письма

      const info = await transporter.sendMail(mailOptions);
      console.log("Письмо успешно отправлено:", info.response);

      // Успешный ответ
      return true;
    } catch (error) {
      // Обработка ошибки
      console.error("Ошибка при отправке письма:", error);
      return false;
    }
  },
  async sendEmailConfirmationMessage(
    email: string,
    confirmationCode: string
  ): Promise<boolean> {
    const transporter = createTransporter();
    const confirmationLink = confirmationCode;
    const emailText = `
  <h1>Thank you for your registration!</h1>
  <p>To finish registration, please follow the link below:</p>
  <a href='https://somesite.com/confirm-email?code=${confirmationLink}'>Complete Registration</a>
`;
    const mailOptions = createMailOptions(
      email,
      "Confirm registration",
      `To confirm registration, follow the link: ${confirmationLink}`,
      // `
      //   <p>To confirm registration, follow the link:</p>
      //   <a href="${confirmationLink}">${confirmationLink}</a>
      // `
      emailText
    );

    console.log("Попытка отправки письма:", mailOptions);

    try {
      const info = await transporter.sendMail(mailOptions);
      // const info = transporter.sendMail(mailOptions);
      // console.log("Письмо успешно отправлено:", info);

      return true;
    } catch (error) {
      console.error("Ошибка при отправке письма:", error);
      return false;
    }
  },
};

function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 587,
    secure: false, // true для порта 465, false для других портов
    auth: {
      user: emailSendAddresses,
      pass: process.env.YA_RU_PASS,
    },
  });
}

function createMailOptions(
  to: string,
  subject: string,
  text: string,
  html: string
) {
  return {
    from: emailSendAddresses,
    to,
    subject,
    text,
    html,
  };
}
