var countdownTimer;
var countdownElement = document.getElementById("countdown");
var progressBar = document.getElementById("progress-bar-inner");
var messageElement = document.getElementById("message");
var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");
var alarmToggle = document.getElementById("alarmToggle");
var alarmIcon = document.getElementById("alarmIcon");
updateProgressBar(100);

var alarmAudio = new Audio("alarm-counter.mp3");
var alarmLoopCount = 0;
var isAlarmOn = false;

isDarkMode = localStorage.getItem("darkMode");
if (isDarkMode === "true") {
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
    alarmToggle.disabled = false;
    messageElement.textContent = "Countdown Started.";

    var countdownDuration = targetDate - Date.now();
    var initialTime = Date.now() + countdownDuration;

    updateProgressBar(100); // Set initial progress to 100%

    countdownTimer = setInterval(function () {
        var now = Date.now();
        var elapsedTime = initialTime - now;
        var progress = (elapsedTime / countdownDuration) * 100;

        if (elapsedTime <= 0) {
            clearInterval(countdownTimer);
            countdownElement.textContent = "Countdown Expired!";
            stopButton.disabled = true;
            alarmToggle.disabled = false;
            messageElement.textContent = "";
            playAlarm();
            updateProgressBar(0); // Set progress to 0% when countdown expires
            return;
        }

        var days = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
        var hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

        countdownElement.innerHTML =
            formatTimeUnit(days) +
            ":" +
            formatTimeUnit(hours) +
            ":" +
            formatTimeUnit(minutes) +
            ":" +
            formatTimeUnit(seconds);

        updateProgressBar(progress);
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownTimer);
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    alarmToggle.disabled = false;
    messageElement.textContent = "Countdown Stopped.";
    stopAlarm();
}

function resetCountdown() {
    clearInterval(countdownTimer);
    countdownElement.textContent = "";
    document.getElementById("datetime").value = "";
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    alarmToggle.disabled = false;
    messageElement.textContent = "Countdown Reset.";
    stopAlarm();
    updateProgressBar(100); // Reset progress to 100%
}

function toggleAlarm() {
    isAlarmOn = !isAlarmOn;
    if (isAlarmOn) {
        alarmIcon.classList.remove("fa-bell-slash");
        alarmIcon.classList.add("fa-bell");
    } else {
        alarmIcon.classList.remove("fa-bell");
        alarmIcon.classList.add("fa-bell-slash");
    }
}

function playAlarm() {
    if (isAlarmOn) {
        alarmLoopCount = 0;
        alarmAudio.currentTime = 0;
        alarmAudio.loop = true;
        alarmAudio.play().catch(function (error) {
            console.error("Failed to play alarm sound:", error);
        });
        alarmAudio.addEventListener("ended", handleAlarmEnded);
    }
}

function handleAlarmEnded() {
    if (alarmLoopCount < 2) {
        alarmLoopCount++;
        alarmAudio.currentTime = 0;
        alarmAudio.play();
    } else {
        stopAlarm();
    }
}

function stopAlarm() {
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    alarmAudio.removeEventListener("ended", handleAlarmEnded);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    var isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode);
}

function updateProgressBar(progress) {
    progressBar.style.width = progress + "%";
}

startButton.addEventListener("click", startCountdown);
stopButton.addEventListener("click", stopCountdown);
resetButton.addEventListener("click", resetCountdown);
alarmToggle.addEventListener("click", toggleAlarm);
darkModeToggle.addEventListener("change", toggleDarkMode);
