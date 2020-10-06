class Playfield {
  constructor() {
    this.questionElement = document.getElementById("question_output");
    this.questionCategory = document.getElementById("question_category");
    this.questionNumber = document.getElementById("question_number");
    this.restart = document.getElementById("restart_button");
    this.resultButton = document.getElementById("result_button");
    this.done = document.getElementById("done_button");
    this.message = document.getElementById("question_output");
    this.start = document.getElementById("start_input");
    this.counter = 0;
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
    this.start.setAttribute("class", "hidden");
  }
  //outputs the question and the answers and finaly returns an array filled with objects from the class Answer
  createPlayfield(questionArray, answerArray) {
    this.questionNumber.textContent = `Question: ${this.counter + 1}/${
      questionArray.length
    }`;
    this.questionCategory.textContent =
      questionArray[this.counter].category === ""
        ? "Category: Random"
        : `Category: ${questionArray[this.counter].category}`;
    this.questionElement.textContent = questionArray[this.counter].question;
    let outputtedAnswers = [];

    for (let i = 0; i < 6; i++) {
      if (answerArray[this.counter][i][0]) {
        outputtedAnswers.push(
          new Answer(i, answerArray[this.counter][i][0], answerArray[this.counter][i][1])
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
    this.counter++;
    return outputtedAnswers;
  }
  //outputs the quitscreen when user press the done button
  quitScreen() {
    done.classList.add("hidden");
    restart.classList.add("hidden");
    message.textContent = "Thank you for playing!";
  }
  //outputs the resultscreen when user press the get resultbutton
  resultScreen(player) {
    this.restart.classList.remove("hidden");
    this.done.classList.remove("hidden");
    this.resultButton.classList.add("hidden");
    if (player.score === 1) {
      this.message.textContent = `Congrats, ${player.name}! You got ${player.score} point!`;
    } else {
      this.message.textContent = `Congrats, ${player.name}! You got ${player.score} points!`;
    }
    this.message.classList.remove("hidden");
  }
  //toggles between buttons and their values
  resultStartNextQuestionToggle(answerArray) {
    if (this.counter === answerArray.length) {
      this.resultButton.classList.remove("hidden");
    } else {
      let startButton = document.getElementById("start_button");
      startButton.value = "Next question";
      startButton.classList.remove("hidden");
    }
  }
}
