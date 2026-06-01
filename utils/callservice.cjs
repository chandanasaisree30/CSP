// const axios = require('axios');
// const querystring = require('querystring');

// // Exotel credentials
// const EXOTEL_SID = "collegeproject2";
// const EXOTEL_TOKEN = "3b94231b3b94a952444523185e80b67d29657a20d24b2742"; // Replace with your token
// const APP_ID = "1034224";
// const CALLER_ID = "09513886363"; // Your trial Exophone

// async function sendMedicationReminderCall(phone, medication, time) {
//   const data = querystring.stringify({
//     From: phone,
//     To: phone,
//     CallerId: CALLER_ID,
//     Url: `http://my.exotel.com/${EXOTEL_SID}/exoml/start/${APP_ID}`
//   });

//   try {
//     const response = await axios.post(
//       `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`,
//       data,
//       {
//         auth: {
//           username: EXOTEL_SID,
//           password: EXOTEL_TOKEN
//         },
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//       }
//     );

//     console.log(`Call placed to ${phone} for ${medication} at ${time}`);
//     return response.data;
//   } catch (error) {
//     console.error("Call failed:", error.response ? error.response.data : error.message);
//   }
// }

// module.exports = { sendMedicationReminderCall };


const axios = require('axios');
const querystring = require('querystring');

// Exotel credentials (replace with your correct values)
const EXOTEL_SID = "collegeproject2";  // Your Exotel Account SID
const EXOTEL_TOKEN = "3b94231b3b94a952444523185e80b67d29657a20d24b2742"; // Your Auth Token
const APP_ID = "1034224";              // Your Exotel App ID
const CALLER_ID = "09513886363";       // Your Exophone number

async function sendMedicationReminderCall(phone, medication, time) {
  // Ensure phone is in +91 format (important for Exotel)
  if (!phone.startsWith('+')) {
    phone = '+91' + phone;
  }

  const data = querystring.stringify({
    From: phone,
    To: phone,
    CallerId: CALLER_ID,
    Url: `http://my.exotel.com/${EXOTEL_SID}/exoml/start/${APP_ID}`
  });

  try {
    const response = await axios.post(
      `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`,
      data,
      {
        auth: {
          username: EXOTEL_SID,
          password: EXOTEL_TOKEN
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    console.log(`Call placed to ${phone} for ${medication} at ${time}`);
    return response.data;
  } catch (error) {
    console.error("Call failed:", error.response ? error.response.data : error.message);
  }
}

module.exports = { sendMedicationReminderCall };