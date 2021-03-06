var questionBank = [
  {
    picture: "assets/images/rosswhiteteeth.gif",
    name: "rosswhiteteeth",
    question:
      "Which of the actors on 'Friends' unfortunately decides to whiten his teeth before going out on a first date with a girl he's had a crush on for some time?",
    choices: ["Gunther", "Chandler", "Ross", "Joey"],
    answer: 2
  },
  {
    picture: "assets/images/rossemily.gif",
    name: "rossemily",
    question: "Who was Ross's second wife?",
    choices: ["Rachel", "Phoebe", "Carol", "Emily"],
    answer: 3
  },
  {
    picture: "assets/images/monicaandchandler.gif",
    name: "monicaandchandler",
    question: "Which two characters get together in London?",
    choices: [
      "Chandler and Monica",
      "Chandler and Janice",
      "Phoebe and Joey",
      "Rachel and Ross"
    ],
    answer: 0
  },
  {
    picture: "assets/images/smellycat.gif",
    name: "smellycat",
    question:
      "Fill in the blanks for Phoebe's song: '_________ ______, _________ ______, what are they feeding you?'",
    choices: [
      "Smelly Fish, Smelly Fish",
      "Happy Dog, Happy Dog",
      "Smelly Cat, Smelly Cat",
      "Crazy Cat, Crazy Cat"
    ],
    answer: 2
  },
  {
    picture: "assets/images/manhattan.gif",
    name: "manhattan",
    question: "Who plays Chandler?",
    choices: [
      "Matt LeBlanc",
      "David Schwimmer",
      "Joshua Jackson",
      "Matthew Perry"
    ],
    answer: 3
  }
];

var correctGuesses = 0;
var wrongGuesses = 0;
var unansweredGuesses = 0;
var timeValue = 10;
var questionNumber = 0;
var userChoice = "";
var questionID = "";
var intervalID;
var image;
var timeValueResult = 0;
var resultType = "";
var timeoutID;
var i;

function startGame() {
  timeValue = 10;
  questionNumber = 0;
  createTimer();
  displayQuestion();
}

function displayQuestion() {
  $(".row, .questionPart").css("visibility", "visible");
  $(".btn-primary, .resultPart").css("visibility", "hidden");
  $(".question").html(questionBank[questionNumber].question);
  var choiceBank = questionBank[questionNumber].choices;
  for (i = 0; i < choiceBank.length; i++) {
    var button = $("<button>");
    button.text(choiceBank[i]);
    button.attr("choiceID", i);
    button.attr("questionID", questionNumber);
    button.attr("class", "list-group-item");
    $(".choices-div").append(button);
    console.log(questionNumber + 1);
  }
  $(".questionTitle").html(
    "Question " + "<span class='questionNumberTxt'></span>"
  );
  $(".questionNumberTxt").html(questionNumber + 1);
}

$(".choices-div").on("click", "button", function(event) {
  userChoice = $(this).attr("choiceID");
  questionID = $(this).attr("questionID");
  resultTxt =
    "The answer is " +
    questionBank[questionID].choices[questionBank[questionID].answer] +
    ".";
  if (Number(userChoice) === questionBank[questionID].answer) {
    correctGuesses++;
    resultType = "Correct! " + resultTxt;
  } else {
    wrongGuesses++;
    resultType = "Wrong! " + resultTxt;
  }
  displayResult();
});

function displayResult() {
  if (questionNumber <= questionBank.length - 1) {
    clearInterval(intervalID);
    $(".timeRemainingTxt").html(0);
  }
  $(".questionPart").empty();
  $(".resultPart").css("visibility", "visible");
  $(".correctTxt").html(correctGuesses);
  $(".wrongTxt").html(wrongGuesses);
  $(".resultType").html(resultType);
  image = $("<img width=300px height=200px>");
  image.attr("src", questionBank[questionNumber].picture);
  $(".imageSpot").html(image);
  questionNumber++;
  timeValue = 5;
  timeoutID = setTimeout(resetGame, 3000);
}

function resetGame() {
  clearInterval(intervalID);
  clearTimeout(timeoutID);
  $(".list-group-item").detach();
  if (questionNumber <= questionBank.length - 1) {
    timeValue = 10;
    createTimer();
    startTimer();
    displayQuestion();
    userChoice = "";
    questionID = "";
  } else {
    $(".btn-primary").html("Restart");
    $(".btn-primary").css("visibility", "visible");
    $(".questionTitle").empty();
    $(".questionTitle").html("Game Over!");
    $(".resultType").css("visibility", "hidden");
    $(".imageSpot").html("<img src='assets/images/gameover.gif'>");
  }
}

function startTimer() {
  timeValue--;
  if (timeValue === 0) {
    if (userChoice === "") {
      debugger;
      resultTxt =
        "The answer is " +
        questionBank[questionNumber].choices[
          questionBank[questionNumber].answer
        ] +
        ".";
      resultType = "You Didn't Answer! " + resultTxt;
      $(".resultType").html(resultType);
      unansweredGuesses++;
      $(".unansweredTxt").html(unansweredGuesses);
    }
    displayResult();
    timeValue = 10;
  }
  $(".timeRemainingTxt").html(timeValue);
}

function createTimer() {
  intervalID = setInterval(startTimer, 1000);
}

$(".btn-primary").on("click", function(event) {
  startGame();
});
