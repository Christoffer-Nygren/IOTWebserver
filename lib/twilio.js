const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendNotification = (stringToSend) => {
  client.messages
    .create({
       body: stringToSend,
       from: '+19526496902',
       to: process.env.TWILIO_TO
     })
    .then(message => console.log(message.sid));
}
