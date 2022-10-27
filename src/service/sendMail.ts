import nodemailer from "nodemailer";
import logger from "./logger";
export const sendMail = (message: string): any => {
  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "todoexpressdemo@gmail.com",
      pass: "pmfdrydqzpydkogb",
    },
  });
  const mailDetails = {
    from: "todoExpressDemo@gmail.com",
    to: "todoExpressDemo@gmail.com",
    subject: message,
    text: message,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      logger.error("Error occurred", err.message);
    } else {
      logger.info("Email sent successfully");
    }
  });
};
