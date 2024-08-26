// Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA-czG_ZNvVlsYLK3TX64ALr2GzyZjBcY4",
    authDomain: "tea-addicts.firebaseapp.com",
    projectId: "tea-addicts",
    storageBucket: "tea-addicts.appspot.com",
    messagingSenderId: "363775085178",
    appId: "1:363775085178:web:6473e20d2fca64890dc9c3",
    measurementId: "G-MNN2F3VHPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the global counter document
const counterRef = doc(db, 'teaCounter', 'global');

// Elements
const teaCounter = document.getElementById('tea-counter');
const sipButton = document.getElementById('sip-button');
const errorMessage = document.getElementById('error-message');

// Sipping sounds
const sipSounds = [
    document.getElementById('sip-sound1'),
    document.getElementById('sip-sound2'),
    document.getElementById('sip-sound3')
];

// Local counter variable
let localCounter = 0;

// Function to update counter on the page
function updateCounter(newCount) {
    localCounter = newCount;
    teaCounter.textContent = localCounter;
    teaCounter.style.transform = "scale(1.2)";
    setTimeout(() => teaCounter.style.transform = "scale(1)", 200);
}

// Function to play a random sip sound
function playRandomSipSound() {
    const randomSound = sipSounds[Math.floor(Math.random() * sipSounds.length)];
    randomSound.play();
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Function to fetch the latest count from Firestore
function fetchCounter() {
    getDoc(counterRef).then((docSnap) => {
        if (docSnap.exists()) {
            updateCounter(docSnap.data().count);
        } else {
            showError("No such document!");
        }
    }).catch((error) => {
        showError("Error getting document: " + error);
    });
}

// Event listener for the sip button
sipButton.addEventListener('click', () => {
    // Update the local counter first to reflect the change immediately
    localCounter++;
    updateCounter(localCounter);
    playRandomSipSound();

    // Sync the increment with Firestore
    updateDoc(counterRef, { count: increment(1) })
        .catch((error) => {
            showError("Error updating document: " + error);
            // Revert the local counter if Firestore update fails
            localCounter--;
            updateCounter(localCounter);
        });
});

// Fetch the latest count on page load
window.addEventListener('load', fetchCounter);