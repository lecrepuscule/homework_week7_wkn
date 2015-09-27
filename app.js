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

app.use(express.static(__dirname));
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get("/", function(req, res){
  res.render(path.join(__dirname + '/views/index.ejs'))
});

router.get("/", function(req, res){
  Animal.find({}, function(err, animals) {
    if (err) console.log(err);
      res.json(animals);
  });
})

router.post("/", function(req, res){
  console.log(req.body);

  var animal = Animal({
    name: req.body.name,
    breed: req.body.breed,
    dob: req.body.dob,
    gender: req.body.gender,
    family: req.body.family,
    status: req.body.status
  });

  animal.save(function(err, newAnimal){
    if (err) console.log(err);
    res.json([newAnimal]);
  })
})

router.put("/:id", function(req, res){
  console.log(req.body.status);
  Animal.update({_id: req.params.id}, {status: req.body.status}, function(err, updatedAnimal){
    if (err) console.log(err);
    res.json(updatedAnimal);
  })
})

router.delete("/:id", function(req, res){
  console.log("hitting delete route");
  console.log(req.params.id);
  Animal.remove({_id: req.params.id}, function(err, removedAnimal){
    if (err) console.log(err);
    res.json(removedAnimal);
  })
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