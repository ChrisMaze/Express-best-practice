import nodemailer from "nodemailer";

export class MailService {
  constructor() {}
  mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "todoexpressdemo@gmail.com",
      pass: "pmfdrydqzpydkogb",
    },
  });

  mailDetails = {
    from: "todoExpressDemo@gmail.com",
    to: "todoExpressDemo@gmail.com",
    subject: "Test Mail using Cron Job",
    text: "Node.js Cron Job Email Demo Test",
  };

  public isSent(message: string) {
    this.mailDetails.subject = message;
    this.mailDetails.text = message;
    this.mailTransporter.sendMail(this.mailDetails, function (err, data) {
      if (err) {
        console.log("Error occurred", err.message);
      } else {
        console.log("Email sent successfully");
      }
    });
  }
}
