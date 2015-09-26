var express = require('express');
var path = require('path');
var debug = require("debug");
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var Animal = require("./models/animal");


var app = express();
var router = express.Router();

var moongoose = require('mongoose');
moongoose.connect('mongodb://localhost/animal-shelter');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.get("/", function(req, res){
  res.sendFile(path.join(__dirname + './views/index.html'))
});

router.get("/", function(req, res){
  // res.json(Animal.find());

  Animal.find({}, function(err, animals) {
    if (err) console.log(err);
      res.json(animals);
  });
})

router.post("/", function(req, res){
  
})

app.use("/animals", router);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.listen(3000)