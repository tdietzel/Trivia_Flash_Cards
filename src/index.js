import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function displayQuestion(answers) {
  console.log(answers);
  let i = 1;
  document.querySelector("button#next").addEventListener("click", () => {
    let question = document.querySelector(`#q${i}`);
    document.querySelector(`#q${(i - 1)}`).remove();
    question.classList.remove('hidden');
    i++;
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
    console.log(decodedQuestion);
  });
  let question = document.querySelector(`#q0`);
  question.classList.remove('hidden');
  displayQuestion(correctAnswers);
}

function getTrivia(e) {
  e.preventDefault();
  let request = new XMLHttpRequest ();
  const url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean&encode=url3986";

  request.addEventListener("loadend", () => {
    const response = JSON.parse(request.responseText);
    if(request.status === 200) {
      printTrivia(response);
    } else {
      console.log("error");
    }
  });
  request.open("GET", url, true);
  request.send();
}

window.addEventListener("load", getTrivia);