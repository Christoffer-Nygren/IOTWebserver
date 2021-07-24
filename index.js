const express = require('express')
var axios = require('axios');
var FormData = require('form-data');
const app = express()
const port = 3000

const sendNotification = (stringToSend) => {
  var data = new FormData();
  data.append('To', process.env.TWILIO_TO);
  data.append('From', process.env.TWILIO_FROM);
  data.append('Body', 'test');

  var config = {
    method: 'post',
    url: process.env.TWILIO_URL,
    headers: {
      'Authorization': process.env.TWILIO_AUTH_TOKEN,
      ...data.getHeaders()
    },
    data : data
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

}

app.get('/', (req, res) => {
  sendNotification('Test')
  res.send('Notification handler')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
