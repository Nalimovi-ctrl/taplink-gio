require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Отправка отзыва в Telegram
app.post('/send-telegram', async (req, res) => {
  const { fio, date, phone, text } = req.body;
  const msg = `📩 Новый отзыв управляющему\nФИО: ${fio}\nДата визита: ${date}\nТелефон: ${phone}\nКак всё прошло: ${text}`;
  try {
    await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: msg
    });
    res.sendStatus(200);
  } catch (e) {
    console.error('Telegram error:', e.response?.data || e.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
