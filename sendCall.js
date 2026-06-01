const axios = require('axios');
const querystring = require('querystring');

const EXOTEL_SID = "collegeproject2"; // Your Account SID
const EXOTEL_TOKEN = "3b94231b3b94a952444523185e80b67d29657a20d24b2742"; // From API credentials
const APP_ID = "1034224"; // Your app ID (from dashboard)
const CALLER_ID = "09513886363"; // Your Exophone trial number

async function sendCall(phone) {
  const data = querystring.stringify({
    From: phone,       // verified phone number
    To: phone,
    CallerId: CALLER_ID,
    Url:`http://my.exotel.com/${EXOTEL_SID}/exoml/start/${APP_ID}`
  });

  await axios.post(
    `https://api.exotel.com/v1/Accounts/${EXOTEL_SID}/Calls/connect.json`,
    data,
    {
      auth: {
        username: EXOTEL_SID,
        password: EXOTEL_TOKEN
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  ).then(res => console.log("Call placed:", res.data))
   .catch(err => console.error(err.response ? err.response.data : err));
}

module.exports = sendCall;