const express = require('express');
const twilio = require('twilio');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/whatsapp', async (req, res) => {
  const incomingMsg = req.body.Body;
  const from = req.body.From;

  try {
    // Fetch reply from your backend API
    const response = await axios.post(process.env.YOUR_BACKEND_API_URL, {
      message: incomingMsg
    });

    const reply = response.data.reply || 'Sorry, I did not understand that.';

    // Send reply back to the user
    await client.messages.create({
      body: reply,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: from
    });

    res.status(200).send('<Response></Response>');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
