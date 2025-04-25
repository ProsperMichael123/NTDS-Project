const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3002; 

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the current directory (or use a 'public' folder if needed)
app.use(express.static(path.join(__dirname)));

// Serve index.html from root directory
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); 
});

// Email route
app.post('/send', (req, res) => {
  const { name, phone, email, service, message } = req.body;

  const output = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Service Interested In:</strong> ${service}</p>
    <p><strong>Message:</strong><br>${message}</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prospermichael1234@gmail.com',
      pass: 'limlpwdlfcuagvok' 
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'prospermichael1234@gmail.com',
    subject: 'New Contact Request from Website',
    html: output,
    replyTo: email
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Something went wrong. Email not sent.');
    }
    console.log('Email sent: ' + info.response);
    res.status(200).send('Message sent successfully!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
