class MethodCollection {
  constructor() {
    this.questionElement = document.getElementById("question_output");
    this.questionCategory = document.getElementById("question_category");
    this.answerNumber = document.getElementById("question_number");
  }
  resetPlayfield() {
    this.questionElement.textContent = "";
    this.questionCategory.textContent = "";
    this.answerNumber.textContent = "";
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
    let mergeArray = answers.map(() => new Array());

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
  //Method that hides the start functionalities
  hideStart() {
    let start = document.getElementById("start_input");
    start.setAttribute("class", "hidden");
  }
  //method that checks if answer is correct
  correctingAnswers(player, answerdQuestion) {
    let amountCorrect = 0;
    let amountClickedAndCorrect = 0;

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
    if (amountCorrect === amountClickedAndCorrect) {
      player.changeScore(1);
      player.currentScoreOutput();
    }
  }
  //method that outputs the question and the answers and finaly returns an array filled with objects from the class Answer
  createPlayfield(questionArray, answerArray, counter) {
    this.answerNumber.textContent = `Question: ${counter + 1}/${questionArray.length}`;
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
