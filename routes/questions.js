var models  = require('../models');
var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {

   models.question_ew_test.findAll().then(function(questions) {

       res.render('questions', {
           title: 'questions',
           questions: questions
       });
   });

});



router.post('/', function (req, res) {

    var question_string = req.body.question_string;
    var answer_string = req.body.answer_string;


    models.answers_ew_test.sync().then(function () {
        return models.answers_ew_test.create({
            question: question_string,
            answer: answer_string
        });
    });

});







module.exports = router;