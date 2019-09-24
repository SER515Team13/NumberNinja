const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "Number Ninja"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let currentUser = req.body;
  sendMail(currentUser, info => {
    console.log(`The mail has been sent and the message id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(currentUser, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptionsAccepted = {
    from: '"Number Ninja"<numberninjateam13@gmail.com>', // sender address
    to: currentUser.email, // list of receivers
    subject: "Welcome to Number Ninja !!!", // Subject line
    html: `<h1>Hi ${currentUser.name}</h1><br>
    <h4>Thanks for joining us</h4>
    <h4>~ Number Ninja Admin Team</h4>`
  };

  let mailOptionsRejected = {
    from: '"Number Ninja"<numberninjateam13@gmail.com>', // sender address
    to: currentUser.email, // list of receivers
    subject: "We are Sorry !!!", // Subject line
    html: `<h1>Hi ${currentUser.name}</h1><br>
    <h4>You have not be authorized for requested role. Thanks for trying, Hope to see you again.</h4>
    <h4>~ Number Ninja Admin Team</h4>`
  };

  // send mail with defined transport object
  let info = currentUser.requestAccepted ? await transporter.sendMail(mailOptionsAccepted) : await transporter.sendMail(mailOptionsRejected);

  callback(info);
}