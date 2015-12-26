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



router.post('/empty_dbs', function (req, res) {

    models.answers_ew_test.truncate();
    models.question_ew_test.truncate();

    res.redirect("/");

});




router.get('/empty_dbs', function(req, res, next) {


    models.answers_ew_test.findAll().then(function(answers) {
        var showform = 1;
        res.render('index', {
            showform: showform,
            answers: answers
        });

    });

});




router.get('/', function(req, res, next) {

    /*
    //housecleaning -- uncomment out this section to delete dbs
    //WARNING: THIS WILL CAUSE AN ERROR TO BE THROWN THE FIRST TIME YOU USE IT --
    //THIS IS ONLY HERE SO I CAN MAKE SURE THE FIRST TIME THIS IS USED IT DOESN'T BREAK
        models.answers_ew_test.drop();
        models.question_ew_test.drop();
    */

  models.answers_ew_test.findAll().then(function(answers) {
  var showform = 1;
    res.render('index', {
        showform: showform,
        answers: answers
    });

  });

});




module.exports = router;
