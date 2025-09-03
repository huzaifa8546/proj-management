import Mailgen from "mailgen";
import nodemailer from "nodemailer";

// const sendEmail = async (options) => {
//   const mailGenerator = new Mailgen({
//     theme: "default",
//     product: {
//       name: "Task Manager",
//       link: "https://taskmanagelink.com",
//     },
//   });

//   const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

//   const emailHtml = mailGenerator.generate(options.mailgenContent);

//   const transporter = nodemailer.createTransport({
//     host: process.env.MAILTRAP_SMTP_HOST,
//     port: process.env.MAILTRAP_SMTP_PORT,
//     auth: {
//       user: process.env.MAILTRAP_SMTP_USER,
//       pass: process.env.MAILTRAP_SMTP_PASS,
//     },
//   });

//   const mail = {
//     from: "mail.taskmanager@example.com",
//     to: options.email,
//     subject: options.subject,
//     text: emailTextual,
//     html: emailHtml,
//   };

//   try {
//     await transporter.sendEmail(mail);
//   } catch (error) {
//     console.error(
//       "Email Service Failed Silently. Make Sure That You Have Provided Your Mailtrap credentials in .env file",
//     );
//     console.error("Error", error);
//   }
// };

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email Service Failed Silently. Make Sure That You Have Provided Your Mailtrap credentials in .env file",
    );
    console.error("Error", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome To Our App! We're Excited To Have You On Board.",
      action: {
        instructions:
          "To Verify Your Email Please Click On The Following Button",
        button: {
          color: "#22bc66",
          text: "Verify Your Email",
          link: verificationUrl,
        },
      },
      outro:
        "Need Help,Or Have Questions, Just Reply To This Email,We'd Love To Help",
    },
  };
};

const ForgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We Got A request To Rest the password of your account",
      action: {
        instructions:
          "To Reset your password click on the following button or link",
        button: {
          color: "#22bc66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need Help,Or Have Questions, Just Reply To This Email,We'd Love To Help",
    },
  };
};

export {
  ForgotPasswordMailgenContent,
  emailVerificationMailgenContent,
  sendEmail,
};
