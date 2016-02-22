

$(document).ready(function () {
    $("#vänster").hover(function () {
        $("#vänster").animate({width: "20%"});
        $("#höger").css("display", "none");
    }, function () {
        $("#vänster").animate({width: "10%"});
        $("#höger").css("display", "");
    });
});

//var clicked = false;
//var sec = 0;
//
//function startTimer() {
//    if (clicked === false) {
//        clock = setInterval("stopWatch()", 1000);
//        clicked = true;
//    }
//    else if (clicked === true) {
//    }
//}
//;
//
//function stopWatch() {
//    sec++;
//    document.getElementById("time").innerHTML = sec;
//}
//
//function pauseWatch() {
//    window.clearInterval(clock);
//    document.getElementById("time").innerHTML = sec;
//}
//
//function stopClock() {
//    window.clearInterval(clock);
//    sec = 0;
//    document.getElementById("time").innerHTML = 0;
//    clicked = false;
//}
//;

var questions = [{
        question: "What is the first name of Ned Starks sister?",
        choices: ["Maege", "Lyanna", "Jeyne", "Sansa"],
        correctAnswer: 1
    },
//    {
//        question: "What is 27*14?",
//        choices: ["485", "634", "408", "528"],
//        correctAnswer: 2
//    },
//    {
//        question: "What is the busiest train station in the world?",
//        choices: ["Grand Central, NY", "Shibuya, Tokyo", "Beijing Central, Chine", "Gard du Nord, Paris"],
//        correctAnswer: 1
//    }, {
//        question: "What is the longest river?",
//        choices: ["Nile", "Amazon", "Mississippi", "Yangtze"],
//        correctAnswer: 0
//    }, {
//        question: "Who is Gucci Mane?",
//        choices: ["Burr", "Scurr", "Yurr", "Furr"],
//        correctAnswer: 0
//    }, 
    {
        question: "Which family was NOT allied with House Baratheon at the beggining of Roberts Rebelion?",
        choices: ["House Lannister", "House Stark", "House Arryn", "House Tully"],
        correctAnswer: 0
    }];

$(document).ready(function () {

    $(".nextButton").css("display", "none");

    $(".startButton").click(function () {

        $(".startButton").css("display", "none");
        $(".nextButton").css("display", "");

        startQuiz();
//        startTimer();
    });
});


var currentQuestion = 0;
var correctAnswers = 0;
var quizOver = false;

function startQuiz() {

    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();

    // On clicking next, display the next question
    $(".nextButton").click(function () {
        if (!quizOver) {


            value = $("input[type='radio']:checked").val();

            if (value == undefined) {
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } else {
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();

                if (value == questions[currentQuestion].correctAnswer) {
                    correctAnswers++;
                }

                currentQuestion++; // Since we have already displayed the first question on DOM ready
                if (currentQuestion < questions.length) {
                    displayCurrentQuestion();
                } else {
                    displayScore();
                    //                    $(document).find(".nextButton").toggle();
                    //                    $(document).find(".playAgainButton").toggle();
                    // Change the text in the next button to ask if user wants to play again
                    $(document).find(".nextButton").text("Play Again?");
                    quizOver = true;
                }
            }
        } else { // quiz is over and clicked the next button (which now displays 'Play Again?'
            quizOver = false;
            $(document).find(".nextButton").text("Next Question");
            resetQuiz();
            displayCurrentQuestion();
            hideScore();
        }
    });

}
;

// This displays the current question AND the choices
function displayCurrentQuestion() {

    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;

    // Set the questionClass text to the current question
    $(questionClass).text(question);

    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();

    var choice;
    for (i = 0; i < numChoices; i++) {
        choice = questions[currentQuestion].choices[i];
        $('<li><input type="radio" value=' + i + ' name="dynradio" />' + choice + '</li>').appendTo(choiceList);
    }
}

function resetQuiz() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
//    stopClock();
}

function displayScore() {
    $("#vänster").animate({width: "20%"});
//    pauseWatch();
    $(document).find(".result").text("You scored: " + correctAnswers + " out of: " + questions.length);
}

function hideScore() {
    $(document).find(".result").hide();
    $("#vänster").animate({width: "10%"});

}
