const express = require('express')
const app = express()
const port = 3000;

const api = require('./api');

app.get('/', (req, res) => {
  res.send('Hello Workd')
})

app.get('/oauth2', (req, res) => {
  api.authenticate(function(authUrl) {
    console.log(authUrl)
    res.redirect(authUrl)
  });
})

app.get('/oauth2callback', (req, res) => {
  const {code, scope} = req.query;
  api.storeTokenFromCode(code, function() {
    console.log('Finished!')
    res.send('Successfully connected Gmail Account.')
  })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})