var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  logger = require('morgan'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  app = express();
  Fund = require('./models/fund');


mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/sashas-app');
mongoose.connection.once("open", function() {
  console.log("Connected to MongoDB")
})

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.listen(12030, function() {
  console.log('Listening in on port 12030');
})
