var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  logger = require('morgan'),
  passport = require('passport'),
  mongoose = require('mongoose'),
  app = express();


var Fund = require('./models/fund.js');

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

app.get('/fund', function(req, res) {
  var query;
  if (req.query.status) {
    query = {status: req.query.status}
  } else {
    query = {};
  }
  Fund.find(query, function(err, response) {
    return res.status(200).json(response);
  });
})
app.post('/fund', function(req, res) {
  var fund = new Fund(req.body);
  fund.save(function(err, response) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(response);
    }
  });
});
app.put('/fund', function(req, res) {
  Fund.findByIdAndUpdate(req.query.id, req.body, function(err, response) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(response);
    }
  });
});


app.listen(12030, function() {
  console.log('Listening in on port 12030');
})
