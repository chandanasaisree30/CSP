const express = require("express");
const router = express.Router();
const Reminder = require("../models/Reminder");
const cron = require("node-cron");
const twilio = require("twilio");
const dotenv = require("dotenv");
const sendEmail = require("../utils/sendEmail");

dotenv.config({ path: './backend/.env' });

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const FROM = process.env.TWILIO_PHONE_NUMBER;

async function sendReminder(type, phone, email, message) {
  if (type === "call") {
    await client.calls.create({
      twiml: <Response><Say>${message}</Say></Response>,
      to: phone,
      from: FROM,
    });
  } else if (type === "sms") {
    await client.messages.create({
      body: message,
      from: FROM,
      to: phone,
    });
  } else if (type === "email" && email) {
    await sendEmail(email, "ElderConnect Reminder", message);
  }
}

router.post("/call", async (req, res) => {
  const { name, phone, message, type, category, dateTime, email } = req.body;

  try {
    const reminderTime = new Date(dateTime);
    if (isNaN(reminderTime)) return res.status(400).json({ msg: "Invalid date format." });

    const reminder = new Reminder({ name, phone, message, type, dateTime: reminderTime });
    await reminder.save();

    if (category === "appointment") {
      const before24h = new Date(reminderTime);
      before24h.setHours(before24h.getHours() - 24);

      const before2h = new Date(reminderTime);
      before2h.setHours(before2h.getHours() - 2);

      const cron24 = `${before24h.getMinutes()} ${before24h.getHours()} ${before24h.getDate()} ${before24h.getMonth() + 1} *`;
      const cron2 = `${before2h.getMinutes()} ${before2h.getHours()} ${before2h.getDate()} ${before2h.getMonth() + 1} *`;

      cron.schedule(cron24, () => sendReminder(type, phone, email, message));
      cron.schedule(cron2, () => sendReminder(type, phone, email, message));
    } else if (category === "medication") {
      const before10 = new Date(reminderTime);
      before10.setMinutes(before10.getMinutes() - 10);

      const cronTime = `${before10.getMinutes()} ${before10.getHours()} ${before10.getDate()} ${before10.getMonth() + 1} *`;
      cron.schedule(cronTime, () => sendReminder(type, phone, email, message));
    }

    res.json({ msg: "✅ Reminder scheduled successfully!" });
  } catch (err) {
    console.error("❌ Scheduling Error:", err.message);
    res.status(500).json({ msg: "❌ Failed to schedule reminder", error: err.message });
  }
});
router.get("/debug-email", async (req, res) => {
  try {
    await sendEmail("your@email.com", "Test ElderConnect Email", "Working like a champ 🏆");
    res.send("✅ Test email sent successfully!");
  } catch (err) {
    console.error("❌ Email test route error:", err.message);
    res.status(500).send("❌ Failed to send email");
  }
});

module.exports = router;
   routes/reminder.js