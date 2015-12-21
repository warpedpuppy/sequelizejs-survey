"use strict";


module.exports = function(sequelize, DataTypes) {
    var question_ew_test = sequelize.define("question_ew_test", {
        question: DataTypes.STRING,
        answer_array: DataTypes.STRING
    });

    return question_ew_test;
};
