class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    //console.log(this.questions);
    this.answerArray = this.createAnswerArray(this.questions);
    //console.log(this.answerArray);
    this.currentAnswers;
    this.hideStart();
    this.player = new Player(playerName);
    this.quiz(
      this.questions,
      this.answerArray,
      this.createPlayfield,
      this.resetPlayfield
    );
  }
  //Method that hides the start functionalities
  hideStart() {
    let start = document.getElementById("start_input");
    start.setAttribute("class", "hidden");
  }
  /*Method that takes all the answers and the boolean that says whether they are correct or not and
  puts them in a multidimentional array*/
  createAnswerArray(inputArray) {
    let answers = [];
    let correctAnswers = [];

    for (let element of inputArray) {
      let tempAnswers = Object.values(element.answers);
      answers.push(tempAnswers);
      let tempCorrectAnswers = Object.values(element.correct_answers);
      correctAnswers.push(tempCorrectAnswers);
    }
    let mergeArray = answers.map((element) => (element = new Array()));

    for (let i = 0; i < mergeArray.length; i++) {
      for (let j = 0; j < 6; j++) {
        let temp = [];
        temp.push(answers[i][j]);
        temp.push(correctAnswers[i][j]);
        mergeArray[i].push(temp);
      }
    }
    return mergeArray;
  }

  quiz(questionArray, answerArray, playfield, resetPlayfield) {
    let counter = 0;
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");

    startButton.addEventListener("click", function () {
      startButton.classList.add("hidden");
      resetPlayfield();
      playfield(questionArray, answerArray, counter++);
    });
  }

  createPlayfield(questionArray, answerArray, counter) {
    let questionOutput = document.getElementById("question_output");
    questionOutput.textContent = questionArray[counter].question;
    let outputtedAnswers = [];
    let answerButton = document.getElementById("answer_button");

    answerButton.classList.remove("hidden");

    for (let i = 0; i < 6; i++) {
      if (answerArray[counter][i][0]) {
        outputtedAnswers.push(
          new Answer(i, answerArray[counter][i][0], answerArray[counter][i][1])
        );
        outputtedAnswers[i].element.addEventListener("click", function () {
          if (!outputtedAnswers[i].clicked) {
            outputtedAnswers[i].element.classList.add("clicked");
            outputtedAnswers[i].clicked = true;
          } else {
            outputtedAnswers[i].element.classList.remove("clicked");
            outputtedAnswers[i].clicked = false;
          }
        });
      }
    }
    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      //check if answers correct and give points etc

      let startButton = document.getElementById("start_button");
      startButton.value = "Next question";
      startButton.classList.remove("hidden");
    });
  }
  resetPlayfield() {
    for (let i = 0; i < 6; i++) {
      let tempElement = document.getElementById(`answer${i}`);
      if (!tempElement.classList.contains("hidden")) {
        tempElement.classList.add("hidden");
        if (tempElement.classList.contains("clicked")) {
          tempElement.classList.remove("clicked");
        }
      }
    }
  }
}
