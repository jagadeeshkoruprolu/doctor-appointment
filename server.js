const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'k.jagadeesh9949@gmail.com', // Replace with your Gmail
        pass: 'oiapivduuitxghxz' // Replace with your App Password
    }
});

app.post('/book-appointment', (req, res) => {
    const { name, email, date, time } = req.body;

    const mailOptions = {
        from: 'k.jagadeesh9949@gmail.com',
        to: email,
        subject: 'Appointment Confirmation',
        text: `Dear ${name},\n\nYour appointment is confirmed for ${date} at ${time}.\n\nThank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Appointment confirmed and email sent.');
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
