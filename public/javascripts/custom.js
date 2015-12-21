/**
 * Created by edwardwalther on 12/19/15.
 */
$(function(){


    var available_questions = [];
    var answered_questions = [];
    var active_question;


    $(".add-question-button").click(function(){

        var question_text = $("#question_text").val();
        var answer_1 = $("#question_answer_1").val();
        var answer_2 = $("#question_answer_2").val();
        var answer_3 = $("#question_answer_3").val();
        var answer_4 = $("#question_answer_4").val();
        var answer_5 = $("#question_answer_5").val();

        if(question_text !== "" &&
        answer_1 !== "" &&
        answer_2 !== "" &&
        answer_3 !== "" &&
        answer_4 !== "" &&
        answer_5 !== "") {

            $("#add_a_question_feedback").text("");
            var answer_array_string = [answer_1, answer_2, answer_3, answer_4, answer_5].toString();

            $.post("/add_question", {question_text: question_text, answer_array_string: answer_array_string});

            $("#question_text").val("");
            $("#question_answer_1").val("");
            $("#question_answer_2").val("");
            $("#question_answer_3").val("");
            $("#question_answer_4").val("");
            $("#question_answer_5").val("");
            $(".generate-random-question-button").css("display", "inline-block");
        }
        else{
            $("#add_a_question_feedback").text("Please fill out all fields. Or just generate random question if don't feel typing.")
        }

    });



    $(".answer-button").click(function(){

        var temp = active_question+1;
        answered_questions.push(temp);
        available_questions.splice(active_question, 1);



        var id = $(this).attr("id");

        var arr = id.split("_");
        var question_number = arr[0];

        var question = $("#question"+question_number).text();



        $("#response").text("Thank you!");

        $("#container"+question_number).css("display", "none");




        //choose a first question:
        active_question = Math.floor(Math.random()*available_questions.length);


        //fade in that question
        if(available_questions.length > 0)
            $("#container"+available_questions[active_question]).fadeIn("fast");
        else
            $("#response").text("no more questions");

        var question_plural = (answered_questions.length == 1)?"question":"questions";

        $(".question_page_title").text("You have answered "+answered_questions.length+" "+question_plural+" out of " + total_questions+" total.");


    });




    $("#add_question_button").click(function(){
        $("#answer-container").css("display", "none");
        $("#add-question-container").fadeIn("fast");
        $("#view-answers-li").removeClass("active");
        $("#add-question-li").addClass("active")

    });
    $("#view_answers_button").click(function(){
        $("#answer-container").fadeIn("fast");
        $("#add-question-container").css("display", "none");
        $("#view-answers-li").addClass("active");
        $("#add-question-li").removeClass("active");
    });


    $(".generate-random-question-button").click(function(){
        $("#add_a_question_feedback").text("");
        var question_string = "Is "+String(Math.floor(Math.random()*1000))+" a nice number?";
        $("#question_text").val(question_string);
        $("#question_answer_1").val("yes");
        $("#question_answer_2").val("no");
        $("#question_answer_3").val("maybe");
        $("#question_answer_4").val("next tuesday for sure");
        $("#question_answer_5").val("sometimes but not always");

        $(this).css("display", "none");

    })


    //some set up things for the question page
    if(window.location.href.indexOf("questions") > -1) {

        //get total questions
        var id = $(".question_page_title").attr("id");
        var temp_array = id.split("_");
        var total_questions = temp_array[1];


        for(var i = 0; i < total_questions; i++){
            available_questions.push(i);
        }

        //choose a first question:
        active_question = Math.floor(Math.random()*available_questions.length);


        //fade in that question
        $("#container"+active_question).fadeIn("fast");
        var less_array_like_integer = active_question+1;

        if(total_questions >0)
            $(".question_page_title").text("this is your first question out of " + total_questions);
        else
            $(".question_page_title").text("There are no questions to answer yet - go to admin section and add some!");

    };

});