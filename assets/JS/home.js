// Variable Declarations
var questions = [
    {
        title: "How do we write javascript elements in HTML?",
        choices: ["<java>", "<js>", "<script>", "<code>"],
        answer: "<script>"
    },
    {
        title: "What is the correct place to insert a javascript link?",
        choices: ["The <body> section", "The <head> section", "Both the <head> and <body> section", "Below all HTML elements"],
        answer: "The <body> section"
    },
    {
        title: "True or False: the external javascript file MUST contain the <script> tag",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "What does 'DOM' stand for?",
        choices: ["Document Object Matrix", "Document Object Model", "Derived Object Model", "Document Object Manipulation"],
        answer: "Document Object Model"
    },
];

var score = 0;
var questionIndex = 0;

// DOM traversal elements
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var container = document.querySelector("#container");
var seeScores = document.querySelector("#highscores")

// Countdown and penalty for incorrect guess
var secondsLeft = 60;

var holdInterval = 0;

var penalty = 10;
// ul to be appended to quiz container
var ulCreate = document.createElement("ul");

// start timer
timer.addEventListener("click", function () {
    seeScores.remove();
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time Remaining: " + secondsLeft + " sec";

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                finish();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    execute(questionIndex);
});

// Renders questions and choices to page: 
function execute(questionIndex) {

    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // Loops through object array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // appends question to ul
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        listItem.setAttribute("class", "list-group-item")
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Compares user choice to correct answer
function compare(e) {
    var element = e.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct answer
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            // Deduct 10 seconds for incorrect guess
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index increments
    questionIndex++;

    if (questionIndex >= questions.length) {
        // Quiz finishes when no more questions from questionIndex
        finish();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct! 👑";
    } else {
        execute(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// Quiz finishes when no more questions or when timer <= 0
function finish() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Create Heading Element
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Score is based on time remaining
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // User Input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // Submit Button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.setAttribute("class", "btn btn-primary");
    createSubmit.textContent = "Submit Score";

    questionsDiv.appendChild(createSubmit);

    // Stores local initials and score on submit
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        // must input something
        if (initials === null) {

            console.log("No value entered!");

        } else {
            // final score object
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }

            console.log(finalScore);

            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // load High Scores page
            window.location.replace("./scores.html");
        }
    });
}
