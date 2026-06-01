const cron = require("node-cron");
const dayjs = require("dayjs");
const mongoose = require("mongoose");
const Reminder = require("./Reminder");
const sendEmail = require("./sendEmail");
const sendCall = require("./sendCall");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/medical_reminder", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Cron: Runs every minute
cron.schedule("* * * * *", async () => {
  const now = dayjs();
  const currentTime = now.format("HH:mm");

  const reminders = await Reminder.find({
    time: currentTime,
    endDate: { $gte: now.toDate() }
  });

  reminders.forEach(r => {
    sendEmail(r.email, r.medicine);   // Email reminder
    sendCall(r.phone);               // Call reminder
  });
});