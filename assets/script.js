var startBtn = $('#execute');
var questions = [
    {
        question: "",
        choices: ["a", "b", "c", "d"],
        answer: ""
    },
    {
        question: "",
        choices: ["a", "b", "c", "d"],
        answer: ""
    },
    {
        question: "",
        choices: ["a", "b", "c", "d"],
        answer: ""
    },
    {
        question: "",
        choices: ["a", "b", "c", "d"],
        answer: ""
    },
    {
        question: "",
        choices: ["a", "b", "c", "d"],
        answer: ""
    }
];

startBtn.on('click', function() {
    startBtn.text("Submit");
    quiz();
});

function quiz();