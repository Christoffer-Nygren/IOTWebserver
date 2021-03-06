const express = require('express')
const axios = require('axios');
const FormData = require('form-data');
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

//Function to send notification to twilio through a http post.
async function sendNotification(stringToSend)  {
  let data = await new FormData();
  data.append('To', process.env.TWILIO_TO);
  data.append('From', process.env.TWILIO_FROM);
  data.append('Body', stringToSend);

  var config = {
    method: 'post',
    url: process.env.TWILIO_URL,
    headers: {
      'Authorization': 'Basic ' + process.env.TWILIO_AUTH_TOKEN,
      ...data.getHeaders()
    },
    data : data
  };

  await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
    return response
  })
  .catch(function (error) {
    console.log(error);
  });

}

//Start page of the express server
app.get('/', (req, res) => {
  res.send('Notification handler')
})

//Page used by pybytes to send notification to the express server
app.post('/test', async (req, res) => {
  console.log(req.body);
  let signal = req.body.signal
  signal == 1 ? await sendNotification(req.body.payload) : console.log('Wrong notification');//Checks if signal is right

  //res.status(200).end()
  res.send('Notification sent')
})

//The server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
