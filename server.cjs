const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models and services
const Reminder = require('./models/Reminder.cjs');
const { sendConfirmationEmail } = require('./utils/emailService.cjs');
const { scheduleReminder, scheduleAllReminders } = require('./utils/schedulerService.cjs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  // Schedule all existing reminders when server starts
  scheduleAllReminders()
    .then(jobs => console.log(`Scheduled ${jobs.length} reminder jobs on startup`))
    .catch(err => console.error('Error scheduling reminders on startup:', err));
})
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'medreminder.html'));
});

// API endpoint to save medication reminders
app.post('/api/reminders', async (req, res) => {
  try {
    const { email, phoneNumber, medications } = req.body;
    
    // Validate input
    if (!email || !phoneNumber || !medications || !medications.length) {
      return res.status(400).json({ success: false, message: 'Invalid input data' });
    }
    
    // Format medications data and calculate end dates
    const medicationsData = medications.map(med => {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + med.duration);
      return {
        ...med,
        endDate
      };
    });
    
    // Check if user already exists
    let reminder = await Reminder.findOne({ email });
    
    if (reminder) {
      // Update existing user's medications
      reminder.medications = medicationsData;
      reminder.phoneNumber = phoneNumber;
      await reminder.save();
    } else {
      // Create new reminder document
      reminder = new Reminder({
        email,
        phoneNumber,
        medications: medicationsData
      });
      await reminder.save();
    }
    
    // Schedule reminders for each medication
    medicationsData.forEach(med => {
      scheduleReminder({
        email,
        phoneNumber,
        medication: med.name,
        time: med.time,
        isDaily: med.isDaily,
        endDate: med.endDate
      });
    });
    
    // Send confirmation email
    try {
      await sendConfirmationEmail(email, medicationsData);
      res.status(200).json({ success: true, message: 'Reminders set successfully' });
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Still save the reminder data but inform the user about email issue
      res.status(200).json({ 
        success: true, 
        message: 'Reminders saved but email notification failed. You will still receive reminders at the scheduled times.'
      });
    }
  } catch (error) {
    console.error('Error saving reminder:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});


