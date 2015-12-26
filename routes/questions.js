var models  = require('../models');
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {

    //BECAUSE THIS IS A TEST APP, I'M SENDING THE ENTIRE QUESTION ARRAY TO THE QUESTIONS VIEW.  IF THIS WERE
   models.question_ew_test.findAll().then(function(questions) {
       res.render('questions', {
           questions: questions
       });
   });

});



router.post('/add_answer', function (req, res) {

    var question_string = req.body.question_string;
    var answer_string = (req.body.answer_string !== undefined)?req.body.answer_string:"No answer was chosen.";


    models.answers_ew_test.create({
            question: question_string,
            answer: answer_string
        });

});







module.exports = router;
