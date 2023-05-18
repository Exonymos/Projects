$(document).ready(function(){var darkModeToggle=document.getElementById("darkModeToggle");const apiUrl="https://opentdb.com/api.php";let questions=[];let currentQuestion=0;let score=0;let timer;let totalScore=0;let userAnswers=[];const difficultyLevels={easy:{scoreIncrease:5,scoreDecrease:3,},medium:{scoreIncrease:10,scoreDecrease:7,},hard:{scoreIncrease:15,scoreDecrease:10,},};if(localStorage.getItem("totalScore")){totalScore=parseInt(localStorage.getItem("totalScore"));$('#total-score').text(totalScore)}
var isDarkMode=localStorage.getItem("darkMode")==="true";if(isDarkMode){document.body.classList.add("dark-mode");darkModeToggle.checked=!0}
function restartQuiz(){$('.menu').show();$('#result').hide();currentQuestion=0;score=0;userAnswers=[];$('#num-questions').val('5');$('#restart-btn').hide()}
function saveTotalScore(){localStorage.setItem("totalScore",totalScore)}
function showNextQuestion(){if(currentQuestion<questions.length){const progressPercent=((currentQuestion+1)/questions.length)*100;const questionData=questions[currentQuestion];$('#progress-bar').css('width',`${progressPercent}%`).attr('aria-valuenow',progressPercent);$('#question').html(questionData.question);$('#choices').empty();const choices=[...questionData.incorrect_answers,questionData.correct_answer];choices.sort(()=>Math.random()-0.5);for(const choice of choices){const choiceHtml=`<div class="form-check">
                                <input class="form-check-input" type="radio" name="choice" id="choice-${choice}" value="${choice}">
                                <label class="form-check-label" for="choice-${choice}">${choice}</label>
                              </div>`;$('#choices').append(choiceHtml)}
resetTimer()}else{endQuiz()}}
function resetTimer(){clearInterval(timer);let timeLeft=20;$('#timer').text(timeLeft);timer=setInterval(()=>{timeLeft--;$('#timer').text(timeLeft);if(timeLeft===0){clearInterval(timer);handleAnswer(null)}},1000)}
function handleAnswer(event){if(event){event.preventDefault()}
const selectedChoice=$('input[name="choice"]:checked').val();userAnswers[currentQuestion]=selectedChoice;const question=questions[currentQuestion];let isCorrect=!1;if(question.type==="boolean"){isCorrect=selectedChoice===String(question.correct_answer)}else if(question.type==="number"){isCorrect=Number(selectedChoice)===question.correct_answer}else{isCorrect=selectedChoice===question.correct_answer}
const difficulty=question.difficulty.toLowerCase();const{scoreIncrease,scoreDecrease}=difficultyLevels[difficulty];if(isCorrect){score+=scoreIncrease}else{score-=scoreDecrease}
currentQuestion++;if(currentQuestion===questions.length){totalScore+=score;$('#current-score').text(score);$('#total-score').text(totalScore);saveTotalScore()}
showNextQuestion()}
function endQuiz(){clearInterval(timer);$('.question-container').hide();$('#result').empty();let correctAnswers=0;for(let i=0;i<questions.length;i++){const question=questions[i];const userAnswer=userAnswers[i]||"None";const isCorrect=userAnswer===question.correct_answer;if(isCorrect){correctAnswers++}
const resultHtml=`<div class="result-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                            <p>${question.question}</p>
                            <p>Your Answer: ${userAnswer}</p>
                            <p>Correct Answer: ${question.correct_answer}</p>
                          </div>`;$('#result').append(resultHtml)}
const resultSummary=`<h2>Quiz Ended</h2>
                            <div class="score-row">                          
                              <p class="score">Your Score: <span id="current-score">${correctAnswers}/${questions.length}</span></p>
                              <p class="score">Total Score: <span id="total-score">${totalScore}</span></p>
                            </div>`;$('#result').prepend(resultSummary).show();$('#restart-btn').show()}
function startQuiz(event){event.preventDefault();const category=$('#category').val();const difficulty=$('#difficulty').val();const numQuestions=$('#num-questions').val();const url=`${apiUrl}?amount=${numQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`;$.getJSON(url,function(data){questions=data.results;score=0;showNextQuestion();$('.menu').hide();$('.question-container').show()})}
$('#quiz-form').submit(startQuiz);$('#next-btn').click(handleAnswer);$('#restart-btn').click(restartQuiz);$('#restart-btn').hide();function toggleDarkMode(){document.body.classList.toggle("dark-mode");var isDarkMode=document.body.classList.contains("dark-mode");localStorage.setItem("darkMode",isDarkMode)}
darkModeToggle.addEventListener("change",toggleDarkMode)})