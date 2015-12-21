var express = require('express');
var models  = require('../models');

var bodyParser = require('body-parser');
var router = express.Router();

var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);


router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.post('/', function (req, res) {

  var question_text = req.body.question_text;
  var answer_array_string = req.body.answer_array_string;


  models.question_ew_test.sync().then(function () {
    return models.question_ew_test.create({
      question: question_text,
      answer_array: answer_array_string
    });
  });



});



router.get('/', function(req, res, next) {



  models.answers_ew_test.findAll().then(function(answers) {

    res.render('index', {
      title: 'answers',
      answers: answers
    });



  });


});




module.exports = router;
