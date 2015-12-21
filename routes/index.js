var express = require('express');
var models  = require('../models');
var bodyParser = require('body-parser');
var router = express.Router();

router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

router.post('/add_question', function (req, res) {

  var question_text = req.body.question_text;
  var answer_array_string = req.body.answer_array_string;

  models.question_ew_test.create({
      question: question_text,
      answer_array: answer_array_string
    });

});

router.get('/', function(req, res, next) {

/*  //housecleaning -- uncomment out this section to clean out dbs
   models.answers_ew_test.drop();
    models.question_ew_test.drop();*/

  models.answers_ew_test.findAll().then(function(answers) {

    res.render('index', {
      title: 'answers',
      answers: answers
    });

  });

});




module.exports = router;
