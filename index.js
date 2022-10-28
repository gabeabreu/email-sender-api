require('dotenv').config();
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.HOST_USER,
    pass: process.env.HOST_PASS,
  },
});

async function sendMail(transporter, content, to) {
  try {
    await transporter.sendMail(
      {
        from: process.env.HOST_USER,
        to: to,
        subject: 'Resposta M2A',
        text: content,
      },
      (err) => {
        if (err) console.log(err);
        else console.log('Email enviado');
      }
    );
  } catch {
    console.log(error);
  }
}

const port = 8000;

app.post('/email', jsonParser, (req, res) => {
  sendMail(transporter, req.body.text, req.body.to);
  // console.log(req.body.text);
  res.status(200).send(req.body);
});

app.listen(port, () => {
  console.log('Listening on port ' + port);
});
