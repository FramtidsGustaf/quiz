class Playfield {
  constructor() {
    this.questionElement = document.getElementById("question_output");
    this.questionCategory = document.getElementById("question_category");
    this.questionNumber = document.getElementById("question_number");
  }
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
  //Method that hides the start functionalities
  hideStart() {
    let start = document.getElementById("start_input");
    start.setAttribute("class", "hidden");
  }
  //method that outputs the question and the answers and finaly returns an array filled with objects from the class Answer
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
}
