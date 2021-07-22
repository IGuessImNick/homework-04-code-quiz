// DOM traversal declarations
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var homeBtn = document.querySelector("#home");

// clear scores
clear.addEventListener("click", function () {
    confirm("Are you sure you want to clear high scores?")

    if (confirm) {
        localStorage.clear();
        location.reload();
    }
});
// get local storage allScores
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {

    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        createLi.setAttribute("class", "list-group-item")
        highScore.appendChild(createLi);

    }
}
// back to home page
homeBtn.addEventListener("click", function () {
    window.location.replace("./index.html");
});