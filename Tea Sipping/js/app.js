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
getDoc(counterRef).then((doc) => {
    if (doc.exists()) {
        updateCounter(doc.data().count);
    } else {
        // Initialize counter if it doesn't exist
        setDoc(counterRef, { count: 0 }).then(() => {
            updateCounter(0);
        });
    }
});

// Handle button click
sipButton.addEventListener('click', () => {
    updateDoc(counterRef, { count: increment(1) })
        .then(() => {
            getDoc(counterRef).then((doc) => {
                if (doc.exists()) {
                    updateCounter(doc.data().count);
                }
            });
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
