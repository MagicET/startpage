import history from 'connect-history-api-fallback'
import express from 'express'

var app = express();
const server = app
  .use(history())
  .use(express.static('dist'))
  .listen(3000, () => {
    console.log('Node.js is listening to PORT:' + server.address().port)
  });