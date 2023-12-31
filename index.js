let heroCardOne = document.querySelector(".hero-card-1");
// heroCardOne.style.display = "none";

// Get the URL query parameters
const queryParams = new URLSearchParams(window.location.search);

// Extract the values
const firstname = queryParams.get("firstname");
const lastname = queryParams.get("lastname");
const email = queryParams.get("email");
let userName = document.querySelector(".profile-name");
userName.textContent = "Welcome! " + firstname + " " + lastname;

// Log the values to the console or use them as needed
console.log("Name:", firstname, lastname);
console.log("Email:", email);

let container = document.querySelector("#container");

// Timer
const duration = 186; // 3 minutes
const timerDisplay = document.querySelector("#timer");

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const updateTimer = (time) => {
  timerDisplay.textContent = formatTime(time);
};

const handleTimerEnd = () => {

  console.log("Time's up!");
  
  
};

const startTimer = () => {
  let time = duration;
  updateTimer(time);

  const timer = setInterval(() => {
    time--;
    updateTimer(time);

    if (time === 0) {
      clearInterval(timer);
      handleTimerEnd();
    }
  }, 1000);
};

startTimer();



// Quiz App
category = "18";
let url =
  "https://opentdb.com/api.php?amount=20&category=" +
  category +
  "&difficulty=easy&type=multiple";
//create an empty array for the correct answers
//creat an empty array for answer selected by the user
let correctAnswers = [];
let selected_answers = [];

//create a quizApp function to fetch the API
const quizApp = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let html = "";
      let questionNumber = 0;

      data.results.forEach((result) => {
        correctAnswers.push(result.correct_answer);

        let otherAnswer = [
          result.correct_answer,
          result.incorrect_answers[0],
          result.incorrect_answers[1],
          result.incorrect_answers[2],
        ];

        html += `
          <br><div id="container">
            <form action="" method="" class="questions-field-form">
              <h3 id="question">${questionNumber + 1}. ${
          result.question
        }</h3>
              
              <br>
              <input type="radio" name="option" id="option1" value="${
                otherAnswer[0]
              }">
              <label for="option1" id="option-a"> a. ${
                otherAnswer[0]
              }</label>
              <br>
              <input type="radio" name="option" id="option2" value="${otherAnswer[1]}">
              <label for="option2" id="option-b">b. ${
                otherAnswer[1]
              }</label>
              <br>
              <input type="radio" name="option" id="option3" value="${otherAnswer[2]}">
              <label for="option3" id="option-c">c. ${
                otherAnswer[2]
              }</label>
              <br>
              <input type="radio" name="option" id="option4" value="${otherAnswer[3]}">
              <label for="option4" id="option-d">d. ${
                otherAnswer[3]
              }</label>
            </form>
          </div>`;

        questionNumber++;
      });

      container.innerHTML = html;

 //the options to select all inputs of name=opton      
      let options = document.querySelectorAll('input[name="option"]');
 
 // for each of the options, add an event listener to listen for the click event
 //with an if statement to know when the option is checked, then push the answers selected into the selected answers array     
      options.forEach((option) => {
        option.addEventListener("click", () => {
          if (option.checked) {
            selected_answers.push(option.value);
            console.log(selected_answers);
          }
        });
      });
    });
};

let submitButton = document.querySelector("#submit");
quizApp();

//event listener to the submit button
submitButton.addEventListener("click", () => {
  //When it is clicked, the submit button should disappear

  submitButton.style.display = "none";
  //create a variable to filter the answers selected and the correct answers
  const filtered_answers = selected_answers.filter((answer) =>
    correctAnswers.includes(answer)
  );
  console.log(filtered_answers);
  
  //userScore counts the number of correct answers selected by the user
  let userScore = filtered_answers.length;
  let userPercent = ((userScore * 5) / 100) * 100;

  let userResult = "You scored " + userPercent + "% in this exam";
  
  let html = `
    ${userResult}
    <div id="results">
      <div>
  </div>
  `;

  container.innerHTML = html;
});
