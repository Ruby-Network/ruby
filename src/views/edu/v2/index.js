const PORT = 3000;
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// create a transporter object with SMTP transport
dotenv.config();

let transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/education"));

app.post("/signup", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let grade = req.body.grade;

  let mailOptions = {
    from: "Ruby Skillz <noreply@rubyskillz.net>",
    to: email,
    subject: "Welcome to Ruby Skillz waiting list",
    text: `Hello ${username},\n\nThank you for signing up for Ruby Skillz! We have added you to our waiting list and will notify you as soon as a spot opens up for ${grade}th grade students.\n\nBest,\nThe Ruby Skillz Team`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("An error occurred while sending the email.");
    } else {
      console.log("Email sent: " + info.response);
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Ruby Skillz</title>
          <link rel="stylesheet" href="../index.css">
        </head>
        <body>
        <header>
        <h1>Ruby Skillz</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </nav>
      </header>
          <main>
            <h1>Thank you for signing up!</h1>
            <p>You have been added to our waiting list. We will notify you as soon as a spot opens up.</p>
          </main>
          <footer>
          <p>&copy; 2023 Ruby Skillz</p>
        </footer>
        </body>
      </html>
      `);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
