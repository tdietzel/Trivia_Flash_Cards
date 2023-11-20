import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function displayQuestion(answers) {
  let userAnswers = [];
  let i = 1;
  document.querySelector("button#next").addEventListener("click", () => {
    if(i < 10) {
      let userAnswer = document.querySelector(`input[name="trivia"]:checked`).value;
      let question = document.querySelector(`#q${i}`);
      document.querySelector(`#q${(i - 1)}`).remove();
      question.classList.remove('hidden');
      userAnswers.push(userAnswer);
      i++;
    } else {
      let totalRight = 0;
      i = 0;
      answers.forEach((answer) => {
        if(answer === userAnswers[i]) {
          totalRight++;
        }
      });
      document.querySelector("p#displayResult").innerText = "You got " + totalRight + " right!";
    }
  });
}

function printTrivia(apiResponse) {
  let div = document.querySelector("p#question");
  let correctAnswers = [];
  let i = 0;
  apiResponse.results.forEach((question) => {
    let decodedQuestion = decodeURIComponent(question.question);
    const h3 = document.createElement("h3");
    h3.innerText = decodedQuestion;
    h3.setAttribute("class", "hidden");
    h3.setAttribute("id", `q${i}`);
    div.appendChild(h3);
    correctAnswers.push(question.correct_answer);
    i++;
  });
  let question = document.querySelector(`#q0`);
  question.classList.remove('hidden');
  displayQuestion(correctAnswers);
}

function getTrivia(e) {
  e.preventDefault();
  let request = new XMLHttpRequest ();
  // https://opentdb.com/api_config.php
  const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean&encode=url3986";

  request.addEventListener("loadend", () => {
    const response = JSON.parse(request.responseText);
    if(request.status === 200) {
      printTrivia(response);
    } else {
      window.alert("status: failed");
    }
  });
  request.open("GET", url, true);
  request.send();
}

window.addEventListener("load", getTrivia);
