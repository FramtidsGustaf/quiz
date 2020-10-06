class Playfield {
  constructor() {
    this.questionElement = document.getElementById("question_output");
    this.questionCategory = document.getElementById("question_category");
    this.questionNumber = document.getElementById("question_number");
  }
  //resets the playfield
  resetPlayfield() {
    this.questionElement.textContent = "";
    this.questionCategory.textContent = "";
    this.questionNumber.textContent = "";
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
  //hides the start functionalities
  hideStart() {
    let start = document.getElementById("start_input");
    start.setAttribute("class", "hidden");
  }
  //outputs the question and the answers and finaly returns an array filled with objects from the class Answer
  createPlayfield(questionArray, answerArray, counter) {
    this.questionNumber.textContent = `Question: ${counter + 1}/${questionArray.length}`;
    this.questionCategory.textContent =
      questionArray[counter].category === ""
        ? "Category: Random"
        : `Category: ${questionArray[counter].category}`;
    this.questionElement.textContent = questionArray[counter].question;
    let outputtedAnswers = [];

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
    return outputtedAnswers;
  }
  //outputs the quitscreen when user press the done button
  quitScreen(done, restart, playfield, message) {
    done.classList.add("hidden");
    restart.classList.add("hidden");
    playfield.resetPlayfield();
    message.textContent = "Thank you for playing!";
  }
  //outputs the resultscreen when user press the get resultbutton
  resultScreen(restart, done, resultButton, playfield, player, message) {
    restart.classList.remove("hidden");
    done.classList.remove("hidden");
    resultButton.classList.add("hidden");
    playfield.resetPlayfield();
    if (player.score === 1) {
      message.textContent = `Congrats, ${player.name}! You got ${player.score} point!`;
    } else {
      message.textContent = `Congrats, ${player.name}! You got ${player.score} points!`;
    }
    message.classList.remove("hidden");
  }
  //toggles between buttons and their values
  resultStartNextQuestionToggle(counter, answerArray, resultButton) {
    if (counter === answerArray.length) {
      resultButton.classList.remove("hidden");
    } else {
      let startButton = document.getElementById("start_button");
      startButton.value = "Next question";
      startButton.classList.remove("hidden");
    }
  }
}
