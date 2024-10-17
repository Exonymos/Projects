const adventureRanks = [
    [1, 0], [2, 375], [3, 875], [4, 1500], [5, 2225],
    [6, 3075], [7, 4025], [8, 5100], [9, 6300], [10, 7600],
    [11, 9025], [12, 10550], [13, 12200], [14, 13975], [15, 15850],
    [16, 17850], [17, 20225], [18, 22725], [19, 25350], [20, 28125],
    [21, 30950], [22, 34375], [23, 38100], [24, 42100], [25, 46400],
    [26, 50975], [27, 55850], [28, 61000], [29, 66450], [30, 72175],
    [31, 78200], [32, 84500], [33, 91100], [34, 98000], [35, 105175],
    [36, 112650], [37, 120400], [38, 128450], [39, 136775], [40, 145400],
    [41, 155950], [42, 167475], [43, 179950], [44, 193400], [45, 207800],
    [46, 223150], [47, 239475], [48, 256750], [49, 275000], [50, 294200],
    [51, 320600], [52, 349400], [53, 380600], [54, 414200], [55, 450200],
    [56, 682550], [57, 941500], [58, 1227250], [59, 1540075], [60, 1880200]
];

function validateInput() {
    const currentAR = parseInt(document.getElementById('currentAR').value);
    const currentXP = parseInt(document.getElementById('currentXP').value);
    const targetAR = parseInt(document.getElementById('targetAR').value);

    if (isNaN(currentAR) || isNaN(currentXP) || isNaN(targetAR) || currentAR < 1 || currentXP < 0 || targetAR <= currentAR) {
        alert('Please enter valid input values.');
        return false;
    }

    return true;
}

function calculateXP() {
    if (!validateInput()) {
        return;
    }

    const currentAR = parseInt(document.querySelector('#currentAR').value);
    const currentXP = parseInt(document.querySelector('#currentXP').value);
    const targetAR = parseInt(document.querySelector('#targetAR').value);

    let currentARXP = 0;
    let targetARXP = 0;

    if (targetAR > adventureRanks[adventureRanks.length - 1][0]) {
        document.querySelector('#result').textContent = `Invalid target AR. The maximum AR is ${adventureRanks[adventureRanks.length - 1][0]}.`;
        return;
    }

    for (let i = 0; i < adventureRanks.length; i++) {
        if (adventureRanks[i][0] === currentAR) {
            currentARXP = adventureRanks[i][1];
        }
        if (adventureRanks[i][0] === targetAR) {
            targetARXP = adventureRanks[i][1];
        }
    }

    const totalCurrentXP = currentXP + currentARXP;
    const xpNeeded = targetARXP - totalCurrentXP;

    if (xpNeeded > 0) {
        document.getElementById('result').textContent = `You need ${xpNeeded} XP to reach AR ${targetAR}. Keep exploring!`;
    } else {
        const currentRank = findCurrentRank(totalCurrentXP);
        const xpToNextRank = adventureRanks[currentRank][1] - totalCurrentXP;

        document.getElementById('result').textContent = `Congratulations! You are at AR ${currentRank}. You need ${xpToNextRank} XP to reach AR ${currentRank + 1}. Keep up the good work!`;
    }
}

function findCurrentRank(totalXP) {
    for (let i = 0; i < adventureRanks.length; i++) {
        if (totalXP < adventureRanks[i][1]) {
            return adventureRanks[i - 1][0];
        }
    }
    return adventureRanks[adventureRanks.length - 1][0];
}

// Save data to localStorage
function saveToLocalStorage() {
    const currentAR = document.getElementById('currentAR').value;
    const currentXP = document.getElementById('currentXP').value;
    const targetAR = document.getElementById('targetAR').value;

    localStorage.setItem('currentAR', currentAR);
    localStorage.setItem('currentXP', currentXP);
    localStorage.setItem('targetAR', targetAR);
}

// Load data from localStorage
function loadFromLocalStorage() {
    const currentAR = localStorage.getItem('currentAR');
    const currentXP = localStorage.getItem('currentXP');
    const targetAR = localStorage.getItem('targetAR');

    if (currentAR !== null) {
        document.getElementById('currentAR').value = currentAR;
    }
    if (currentXP !== null) {
        document.getElementById('currentXP').value = currentXP;
    }
    if (targetAR !== null) {
        document.getElementById('targetAR').value = targetAR;
    }
}

// Call loadFromLocalStorage when the page loads
window.onload = loadFromLocalStorage;

// Update saveToLocalStorage when input values change
document.getElementById('currentAR').addEventListener('input', saveToLocalStorage);
document.getElementById('currentXP').addEventListener('input', saveToLocalStorage);
document.getElementById('targetAR').addEventListener('input', saveToLocalStorage);
