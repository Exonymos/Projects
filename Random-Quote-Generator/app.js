const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const newQuoteBtn = document.querySelector(".new-quote");
const tweetQuoteBtn = document.querySelector(".tweet-quote");
const toggle = document.querySelector("#toggle");

const endpoint = "https://api.quotable.io/random";

// Function to fetch a random quote from the API
async function getRandomQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Failed to fetch the quote");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        alert("Failed to fetch the quote. Please try again later.");
    }
}

// Function to display the quote on the page
function displayQuote() {
    getRandomQuote()
        .then((data) => {
            quote.textContent = data.content;
            author.textContent = `- ${data.author}`;
            setTweetButton(data.content, data.author);
        })
        .catch((error) => {
            console.log(error);
            quote.textContent =
                "Failed to fetch the quote. Please try again later.";
            author.textContent = "";
            tweetQuoteBtn.href = "";
        });
}

// Function to set the tweet button link
function setTweetButton(content, author) {
    tweetQuoteBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `"${content}" - ${author}`
    )}`;
}

// Display the initial quote on page load
displayQuote();

// Event listener for the "New Quote" button
newQuoteBtn.addEventListener("click", displayQuote);

// Event listener for the dark mode toggle switch
toggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
});

// Add alt text to the toggle switch for accessibility
toggle.setAttribute("alt", "Toggle dark mode");

// Copy Quote function
const copyQuoteButton = document.querySelector(".copy-quote");
copyQuoteButton.addEventListener("click", () => {
    const quoteText = document.querySelector(".quote").innerText;
    const quoteAuthor = document.querySelector(".author").innerText;
    const quoteContent = `${quoteText}\n${quoteAuthor}`;

    navigator.clipboard
        .writeText(quoteContent)
        .then(() => {
            copyQuoteButton.textContent = "Copied!";
            setTimeout(() => {
                copyQuoteButton.textContent = "Copy Quote";
            }, 3000);
        })
        .catch((error) => {
            console.error(error);
        });
});
