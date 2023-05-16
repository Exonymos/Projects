// Set up variables
let randomNumber;
let maxNumber = 100;
let guessCount = 0;
let score = 0;
let timer;
let timeLeft;

// Get the max number from the HTML and display it
document.getElementById("max-number").textContent = maxNumber;

// Get the user's score from localStorage and display it
if (localStorage.getItem("score")) {
    score = parseInt(localStorage.getItem("score"));
    document.getElementById("score").textContent = "Your score: " + score;
    document.getElementById("score").style.display = "block";
}

// Generate a random number between 1 and the max number
randomNumber = Math.floor(Math.random() * maxNumber) + 1;

// Hint button functionality
document.getElementById("hint").addEventListener("click", function () {
    let hint;
    if (randomNumber % 2 === 0) {
        hint = "The number is even.";
    } else {
        hint = "The number is odd.";
    }
    document.getElementById("feedback").textContent = hint;
});

// Submit button functionality
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
    let guess = parseInt(document.getElementById("guess").value);
    if (guess === randomNumber) {
        guessCount++;
        score += 15 + timeLeft; // add 15 points for a correct guess, plus any remaining time
        document.getElementById("feedback").textContent = "Congratulations! You guessed the number in " + guessCount + " guesses.";
        document.getElementById("score").textContent = "Your score: " + score;
        document.getElementById("score").style.display = "block";
        // Save the user's score in localStorage
        localStorage.setItem("score", score);
        document.getElementById("guess").disabled = true; // disable input
        document.querySelector('button[type="submit"]').disabled = true; // disable submit button
        clearInterval(timer);
    } else if (guess > randomNumber) {
        guessCount++;
        score -= 5; // subtract 5 points for an incorrect guess
        document.getElementById("feedback").textContent = "Too high. Guess again.";
    } else if (guess < randomNumber) {
        guessCount++;
        score -= 5; // subtract 5 points for an incorrect guess
        document.getElementById("feedback").textContent = "Too low. Guess again.";
    }
    // Update the score display
    document.getElementById("score").textContent = "Your score: " + score;
    // Start timer
    if (!timer) {
        timeLeft = 30;
        timer = setInterval(function () {
            if (timeLeft === 0) {
                clearInterval(timer);
                document.getElementById("feedback").textContent = "Time's up! You lose.";
                document.getElementById("timer").textContent = "Time left: 0 seconds";
                document.getElementById("guess").disabled = true; // disable input
                document.querySelector('button[type="submit"]').disabled = true; // disable submit button
                document.getElementById("play-again").disabled = false; // enable play again button
            } else {
                document.getElementById("timer").textContent = "Time left: " + timeLeft + " seconds";
                timeLeft--;
            }
        }, 1000);
    }
});

// Play again button functionality
document.getElementById("play-again").addEventListener("click", function () {
    // Reset variables
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    guessCount = 0;
    timeLeft = 30;
    document.getElementById("feedback").textContent = "";
    document.getElementById("score").style.display = "none";
    document.getElementById("guess").value = "";
    document.getElementById("max-number").textContent = maxNumber;
    document.getElementById("guess").disabled = false; // enable input
    document.querySelector('button[type="submit"]').disabled = false; // enable submit button
    document.getElementById("play-again").disabled = false; // disable play again button
    // Start timer
    timer = setInterval(function () {
        if (timeLeft === 0) {
            clearInterval(timer);
            document.getElementById("feedback").textContent = "Time's up! You lose.";
            document.getElementById("guess").disabled = true; // disable input
            document.querySelector('button[type="submit"]').disabled = true; // disable submit button
            document.getElementById("play-again").disabled = false; // enable play again button
        } else {
            document.getElementById("timer").textContent = "Time left: " + timeLeft + " seconds";
            timeLeft--;
        }
    }, 1000);
});

// Load the saved score from local storage if it exists
if (localStorage.getItem("score")) {
    score = parseInt(localStorage.getItem("score"));
    document.getElementById("score").textContent = "Your score: " + score;
    document.getElementById("score").style.display = "block";
}

// Save the score to local storage when the page is unloaded
window.addEventListener("unload", function () {
    localStorage.setItem("score", score);
});

// Hint button functionality
document.getElementById("hint").addEventListener("click", function () {
    let hint;
    if (randomNumber % 2 === 0) {
        hint = "The number is even.";
    } else {
        hint = "The number is odd.";
    }
    document.getElementById("feedback").textContent = hint;
});

// Dark mode toggle using Bootstrap
function toggleDarkMode() {
    var btn = document.getElementById("dark-mode-toggle");
    if (btn.textContent === "Light Mode") {
        btn.textContent = "Dark Mode";
        btn.style.backgroundColor = "";
        btn.style.color = "";
    } else {
        btn.textContent = "Light Mode";
        btn.style.backgroundColor = "#f2f2f2";
        btn.style.color = "black";
    }
    document.body.classList.toggle("dark-mode");
    document.querySelectorAll(".card").forEach(card => {
        card.classList.toggle("dark-mode");
    });
    document.querySelector(".btn-primary").classList.toggle("dark-mode");
    document.querySelector(".btn-info").classList.toggle("dark-mode");
    document.querySelector(".btn-secondary").classList.toggle("dark-mode");
}

document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);

