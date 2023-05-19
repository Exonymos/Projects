var countdownTimer;
var countdownElement = document.getElementById("countdown");
var messageElement = document.getElementById("message");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var darkModeToggle = document.getElementById("darkModeToggle");

// Check if dark mode preference is stored in localStorage
var isDarkMode = localStorage.getItem("darkMode") === "true";

// Set initial dark mode state
if (isDarkMode) {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

function formatTimeUnit(unit) {
    return unit.toString().padStart(2, "0");
}

function startCountdown() {
    var datetime = document.getElementById("datetime").value;
    var targetDate = new Date(datetime).getTime();

    if (isNaN(targetDate) || targetDate <= Date.now()) {
        messageElement.textContent = "Please select a valid future date and time.";
        return;
    }

    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
    messageElement.textContent = "Countdown Started.";

    countdownTimer = setInterval(function () {
        var now = new Date().getTime();
        var distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = "Countdown Expired!";
            stopButton.disabled = true;
            messageElement.textContent = "";
            return;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML =
            formatTimeUnit(days) +
            ":" +
            formatTimeUnit(hours) +
            ":" +
            formatTimeUnit(minutes) +
            ":" +
            formatTimeUnit(seconds);
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownTimer);
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    messageElement.textContent = "Countdown Stopped.";
}

function resetCountdown() {
    clearInterval(countdownTimer);
    countdownElement.textContent = "";
    document.getElementById("datetime").value = "";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    messageElement.textContent = "Countdown Reset.";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    var isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

startButton.addEventListener("click", startCountdown);
stopButton.addEventListener("click", stopCountdown);
resetButton.addEventListener("click", resetCountdown);
darkModeToggle.addEventListener("change", toggleDarkMode);
