let questionNumber = 0;
let score = 0;

function generateQuestion () {

  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber} ">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}
function changeQuestionNumber () {
   questionNumber ++;
   $('.questionNumber').text(questionNumber+1);
}
function changeScore () {
  score ++;
}
function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}
function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}
function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}
function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}
function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}
function updateScore () {
  changeScore();
  $('.score').text(score);
}
function renderResults () {
  if (score >= 8) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Nice Job!</h3><img src="/images/moviescut.png" alt="campfire animated icon"/><p>You got ${score} / 10</p><p>You're awseome! Ever thought about beign a movie critic?!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Not quite there yet!</h3><img src="/images/moviescut.png" alt="raccoona animated icon"/><p>You got ${score} / 10</p><p>just a little bit more studying and you got this!!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>At least you have a lot of movies to watch now!</h3><img src="/images/moviescut.png" alt="car animcated icon"/><p>You got ${score} / 10</p><p>You could use a lot more movie time </p><button class="restartButton">Restart Quiz</button></div>`);
  }
}
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);