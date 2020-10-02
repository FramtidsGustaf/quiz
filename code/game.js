class Game {
  constructor(questionArray, playerName) {
    this.questions = questionArray;
    console.log(questionArray);
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
      this.resetPlayfield,
      this.player,
      this.correct
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
    console.log(mergeArray);
    return mergeArray;
  }

  quiz(questionArray, answerArray, playfield, resetPlayfield, player, correct) {
    let counter = 0;
    let startButton = document.getElementById("start_button");
    startButton.classList.remove("hidden");

    startButton.addEventListener("click", function () {
      startButton.classList.add("hidden");
      resetPlayfield();
      playfield(questionArray, answerArray, counter++, player, correct);
    });
  }

  createPlayfield(questionArray, answerArray, counter, player, correct) {
    let questionOutput = document.getElementById("question_output");
    questionOutput.textContent = questionArray[counter].question;
    let answerButton = document.getElementById("answer_button");
    let outputtedAnswers = [];
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
    outputtedAnswers = [];
    answerButton.addEventListener("click", function () {
      answerButton.classList.add("hidden");
      correct(outputtedAnswers, player);
      outputtedAnswers = [];
      //check if answers correct and give points etc
      let startButton = document.getElementById("start_button");
      startButton.value = "Next question";
      startButton.classList.remove("hidden");
    });
  }
  //method that makes the questions go back to normal
  resetPlayfield() {
    for (let i = 0; i < 6; i++) {
      let tempElement = document.getElementById(`answer${i}`);
      if (!tempElement.classList.contains("hidden")) {
        tempElement.classList.add("hidden");
        if (tempElement.classList.contains("clicked")) {
          tempElement.classList.remove("clicked");
        }
      }
      if (!tempElement.classList.contains("answer_div")) {
        tempElement.classList.add("answer_div");
      }
      if (tempElement.classList.contains("correct_div")) {
        tempElement.classList.remove("correct_div");
      }
      if (tempElement.classList.contains("false_div")) {
        tempElement.classList.remove("false_div");
      }
    }
  }
  //method that checks if answer is correct
  correct(answerdQuestion, player) {
    let amountCorrect = 0;
    let amountClickedAndCorrect = 0;
    console.log(answerdQuestion);

    //having some problems that true elements gets color red from time to time
    //having some problems that score increments to much
    for (let i = 0; i < answerdQuestion.length; i++) {
      let answerElement = document.getElementById(`answer${i}`);
      answerElement.classList.remove("answer_div");

      if (answerdQuestion[i].correct) {
        answerElement.classList.add("correct_div");
        amountCorrect++;
      } else {
        answerElement.classList.add("false_div");
      }
      if (answerdQuestion[i].correct && answerdQuestion[i].clicked) {
        amountClickedAndCorrect++;
      }
    }
    if (amountCorrect == amountClickedAndCorrect) {
      player.score++;
      player.currentScoreOutput();
    }
    this.outputtedAnswers = [];
  }
}
