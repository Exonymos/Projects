let counter = 0;
const counterValue = document.getElementById("counter-value");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const resetBtn = document.getElementById("reset");
const advancedBtn = document.getElementById("advanced");
const add2Btn = document.getElementById("add2-btn");
const add10Btn = document.getElementById("add10-btn");
const subtract2Btn = document.getElementById("subtract2-btn");
const subtract10Btn = document.getElementById("subtract10-btn");
const extraButtons = document.getElementById("extra-buttons");

function increment() {
  counter++;
  counterValue.textContent = counter;
}

function decrement() {
  counter--;
  counterValue.textContent = counter;
}

function reset() {
  counter = 0;
  counterValue.textContent = counter;
}

function add2() {
  counter += 2;
  counterValue.textContent = counter;
}

function add10() {
  counter += 10;
  counterValue.textContent = counter;
}

function subtract2() {
  counter -= 2;
  counterValue.textContent = counter;
}

function subtract10() {
  counter -= 10;
  counterValue.textContent = counter;
}

function advanced() {
  advancedBtn.classList.toggle("active");
  extraButtons.classList.toggle("active");
}

incrementBtn.addEventListener("click", increment);
decrementBtn.addEventListener("click", decrement);
resetBtn.addEventListener("click", reset);
advancedBtn.addEventListener("click", advanced);
add2Btn.addEventListener("click", add2);
add10Btn.addEventListener("click", add10);
subtract2Btn.addEventListener("click", subtract2);
subtract10Btn.addEventListener("click", subtract10);
