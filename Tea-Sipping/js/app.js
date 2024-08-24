import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

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

// Function to update counter on the page
function updateCounter(newCount) {
    teaCounter.textContent = newCount;
}

// Get the current counter value from Firestore
getDoc(counterRef).then((docSnap) => {
    if (docSnap.exists()) {
        updateCounter(docSnap.data().count);
    } else {
        // Initialize counter if it doesn't exist
        setDoc(counterRef, { count: 0 }).then(() => {
            updateCounter(0);
        });
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});

// Handle button click
sipButton.addEventListener('click', () => {
    console.log("Button clicked!"); // Debugging line

    updateDoc(counterRef, { count: increment(1) })
        .then(() => {
            getDoc(counterRef).then((docSnap) => {
                if (docSnap.exists()) {
                    updateCounter(docSnap.data().count);
                }
            });
        }).catch((error) => {
            console.error("Error updating document:", error);
        });
});

// Change background image randomly
function changeBackgroundImage() {
    const images = ['image1.jpg', 'image2.jpg', 'image3.jpg']; // Replace with your image paths
    const randomImage = images[Math.floor(Math.random() * images.length)];
    document.querySelector('.background').style.backgroundImage = `url(${randomImage})`;
}

// Change image every time the page is loaded
changeBackgroundImage();
