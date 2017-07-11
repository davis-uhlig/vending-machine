const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const nodeEnv = process.env.NODE_ENV || "development";
// const config = require("./config.json")[nodeEnv];
const expressValidator = require('express-validator');
const routes = require('./routes/routes.js');

const app = express();

// if (require.main === 'module'){
//   mongoose.connect(config.mongoURL);
// }


app.use('/static', express.static('static'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(routes);

app.use(expressValidator());

if (require.main === module) {
  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/.')
  });
}

module.exports = app;
